export interface Quote { text: string; author: string }
export const QUOTES: Quote[] = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
  { text: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson' },
  { text: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
  { text: "Believe you can and you're halfway there.", author: 'Theodore Roosevelt' },
  { text: "Your time is limited, don't waste it living someone else's life.", author: 'Steve Jobs' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Success is not final; failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
  { text: 'What you get by achieving your goals is not as important as what you become.', author: 'Henry David Thoreau' },
  { text: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
  { text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
  { text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { text: "Life is what happens when you're busy making other plans.", author: 'John Lennon' },
  { text: 'Spread love everywhere you go.', author: 'Mother Teresa' },
  { text: 'Always remember that you are absolutely unique. Just like everyone else.', author: 'Margaret Mead' },
  { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: 'Robert Louis Stevenson' },
  { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
  { text: "You miss 100% of the shots you don't take.", author: 'Wayne Gretzky' },
  { text: "Whether you think you can or you think you can't, you're right.", author: 'Henry Ford' },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: 'Thomas Edison' },
  { text: 'Everything you have ever wanted is on the other side of fear.', author: 'George Addair' },
  { text: 'Dream big and dare to fail.', author: 'Norman Vaughan' },
  { text: 'You become what you believe.', author: 'Oprah Winfrey' },
  { text: 'The harder I work, the luckier I get.', author: 'Samuel Goldwyn' },
  { text: 'Small steps every day lead to great changes.', author: 'Unknown' },
  { text: 'A person who never made a mistake never tried anything new.', author: 'Albert Einstein' },
  { text: 'Do one thing every day that scares you.', author: 'Eleanor Roosevelt' },
  { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  { text: 'Your limitation—it is only your imagination.', author: 'Unknown' },
]
export function getQuoteForDay(): Quote {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86_400_000)
  return QUOTES[dayOfYear % QUOTES.length]
}
