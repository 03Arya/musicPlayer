// pages/_app.js
import '../styles/globals.css'
import '../styles/footer.css'
import '../styles/login.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp