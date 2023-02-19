import Header from '../components/Header.island'

export default function BaseLayout({ children }) {
  return (
    <>
      <Header />
      <section class="container">{children}</section>
    </>
  )
}
