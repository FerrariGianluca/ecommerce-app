import React from 'react'
import Navbar from '../pages/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import { useRef, useEffect, useState } from "react";

function Layout({children}) {

    const headerRef = useRef(null);
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (headerRef.current) setNavbarHeight(headerRef.current.offsetHeight);
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);


    useEffect(() => {
      document.title = "Supermercado | Mi E-Commerce"

      // Función para actualizar meta tags
      const updateMetaTag = (name, content, attribute = 'name') => {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if(!meta){
          meta = document.createElement("meta");
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      }

      // Meta tags básicos
      updateMetaTag("description", "Explora los productos de nuestro supermercado online.");
      updateMetaTag("keywords", "supermercado, ecommerce, productos alimenticios, compras online");
      updateMetaTag("author", "Mi E-Commerce");
      updateMetaTag("robots", "index, follow");

      // Open Graph
      updateMetaTag("og:title", "Supermercado | Mi E-Commerce", "property");
      updateMetaTag("og:description", "Explora los productos de nuestro supermercado online.", "property");
      updateMetaTag("og:type", "website", "property");
      updateMetaTag("og:image", `${window.location.origin}/assets/carrito.png`, "property");
      updateMetaTag("og:url", window.location.href, "property");
    }, [])

    return (
    <LayoutContainer>
        <Header ref={headerRef}>
            <Navbar />
        </Header>

        <Main style={{ marginTop: navbarHeight }}>
            {children}
        </Main>
        <FooterWrapper>
            <Footer />
        </FooterWrapper>
    </LayoutContainer>
  )
}

export default Layout

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const Header = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
`

const Main = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FooterWrapper = styled.footer`
`