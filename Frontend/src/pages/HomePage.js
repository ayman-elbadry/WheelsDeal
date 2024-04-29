import { Container, Flex, VStack } from "@chakra-ui/react";
import HomePageText from "../components/ui/home-page-text";
import HomePageButton from "../components/ui/home-page-button";
import HomePageImage from "../components/ui/home-page-image";
import Footer from "../components/navbar/Footer";
import Midle from "../components/ui/midle";

function Home() {




  return (
    <>
      {/* <Container overflow="hidden" maxWidth="1720px" px={[12, 8, 8]}>
        <Flex h="100vh" rowGap={4} direction={"row"}>
          <VStack
            alignItems="start"
            justifyContent="center"
            spacing={7}
            px={[0, 12, 4, 8]}
            h="full"
          >
            <HomePageText />
            <HomePageButton />
          </VStack>
          <HomePageImage />
        </Flex>
      </Container> */}
      <Midle/>
      <Footer />
    </>
  );
}

export default Home;
