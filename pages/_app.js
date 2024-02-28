import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import darkTheme from './theme';

import Head from 'next/head'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Set title and meta description */}
        <title>Soccer Predictions - Footixify</title>
        <meta name="description" content="Get accurate soccer predictions and betting tips for upcoming matches. Stay updated with the latest soccer predictions and analysis." />

        {/* Set canonical URL */}
        <link rel="canonical" href="https://mg30.github.io/footixify/" />

        {/* Add meta tags for social sharing */}
        <meta property="og:title" content="Soccer Predictions - Footixify" />
        <meta property="og:description" content="Get accurate soccer predictions and betting tips for upcoming matches. Stay updated with the latest soccer predictions and analysis." />
        <meta property="og:url" content="https://mg30.github.io/footixify/" />
        <meta property="og:type" content="website" />

        {/* Add Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Soccer Predictions - Footixify" />
        <meta name="twitter:description" content="Get accurate soccer predictions and betting tips for upcoming matches. Stay updated with the latest soccer predictions and analysis." />

        {/* Add Google Fonts or any other fonts you use */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

    </>
  )
}
