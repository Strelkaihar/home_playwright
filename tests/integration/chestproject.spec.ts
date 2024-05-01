import { test, expect } from '@playwright/test'

test.describe('Checkers game', () => {
  /**
   * 1. Navigate to https://www.gamesforthebrain.com/game/checkers/
   * 2. Confirm that the site is up
   * 3. Make five legal moves as orange:
   *  a) Include taking a blue piece
   *  b) Use "Make a move" as confirmation that you can take the next step
   *  c) Restart the game after five moves
   *  d) Confirm that the restarting had been successful
   */

  test.only('Checkers game', async ({ page }) => {
    const response = await page.goto('https://www.gamesforthebrain.com/game/checkers/')
    // Confirming here site is up
    expect(response.status()).toBe(200)
    const blue = page.locator('img[src^="me"]')
    let blueCount = await page.locator('img[src="me1.gif"]').count()

    // Make five legal moves as orange
    const moves = [
      { from: { x: 4, y: 2 }, to: { x: 5, y: 3 } },
      { from: { x: 6, y: 2 }, to: { x: 7, y: 3 } },
      { from: { x: 7, y: 3 }, to: { x: 6, y: 4 } },
      { from: { x: 7, y: 1 }, to: { x: 5, y: 3 } },
      { from: { x: 2, y: 2 }, to: { x: 1, y: 3 } },
    ]

    let capturedBlueCount = 0 // Created counter here so I can dynamically count how many blue pieces were captured
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]
      const from = page.locator(`[name="space${move.from.x}${move.from.y}"]`)
      await from.click()
      const to = page.locator(`[name="space${move.to.x}${move.to.y}"]`)
      await to.click()

      await page.waitForTimeout(2000)

      const currentBlueCount = await page.locator('img[src="me1.gif"]').count()

      // Checking here if a blue piece was captured
      if (currentBlueCount < blueCount) {
        capturedBlueCount++
        // Validating here if it was a valid diagonal capture move
        const diffX = Math.abs(move.from.x - move.to.x)
        const diffY = Math.abs(move.from.y - move.to.y)

        expect(diffX === 2 && diffY === 2).toBeTruthy()
      }

      blueCount = currentBlueCount

      await expect(page.locator('#message')).toHaveText('Make a move.')
    }

    await page.getByRole('link', { name: 'Restart...' }).click()

    // Confirming here that the restarting had been successful by validating 2 things
    // 1. That the blue pieces count is the same as the initial count by adding the capturedBluePiecesCount to it so it must be 12
    await expect(blue).toHaveCount(blueCount + capturedBlueCount)
    // 2. That the message is "Select an orange piece to move."
    await expect(page.locator('#message')).toHaveText('Select an orange piece to move.')
  })
})

test('Deck of Cards game flow', async ({ page, request }) => {
  // 1. Navigating to website  
  await page.goto('https://deckofcardsapi.com/')
  // 2. Confirm the site is up
  const title = await page.title()
  expect(title).toBe('Deck of Cards API')

  // 3. Getting a new deck
  const response = await request.get('https://deckofcardsapi.com/api/deck/new/')
  const data = await response.json()
  expect(response.ok()).toBe(true)
  expect(data.success).toBe(true)
  const deckId = data.deck_id

  // 4. Shuffle the deck
  const shuffleResponse = await request.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
  const shuffleData = await shuffleResponse.json()
  expect(shuffleData.success).toBe(true)

  // 5. I deal three cards to each of two players by specifying a count of 6
  const dealResponse = await request.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
  const dealData = await dealResponse.json()
  // console.log(dealData)
  // console.log(dealData.cards)
  expect(dealData.success).toBe(true)
  expect(dealData.cards.length).toBe(6)

  // Dividing the cards into two arrays of 3 cards to each player
  const player1Cards = dealData.cards.slice(0, 3)
  // console.log(player1Cards)
  const player2Cards = dealData.cards.slice(3)
  // console.log(player2Cards)

  // 6. Defined a function to check whether either has blackjack
  const hasBlackjack = (cards) => {
    const cardValues = cards.map((card) => card.value)
    console.log(cardValues)

    return (
      cardValues.includes('ACE') &&
      (cardValues.includes('10') ||
        cardValues.includes('JACK') ||
        cardValues.includes('QUEEN') ||
        cardValues.includes('KING'))
    )
  }

  // If player 1 or player 2 has blackjack, I log the result
  if (hasBlackjack(player1Cards)) {
    console.log('Player 1 has blackjack!')
  }
  if (hasBlackjack(player2Cards)) {
    console.log('Player 2 has blackjack!')
  }
})
