import React from 'react';
import { Logo } from '../../../../theme/Logo';
import Link from '../../../commons/Link';
import Box from '../../../foundation/layout/Box';
import Grid from '../../../foundation/layout/Grid';
import Text from '../../../foundation/Text';
import LoginForm from '../../../patterns/FormLogin';
import FormRegister from '../../../patterns/FormRegister';
import useWebsitePageContext from '../../../wrappers/WebsitePage/context';

export default function LoginScreen() {
  const websitePageContext = useWebsitePageContext;

  return (
    <Grid.Container
      display="flex"
      flex="1"
      alignItems="center"
    >
      <Grid.Row
        flex="1"
        alignItems="center"
        justifyContent="center"
      >
        <Grid.Column
          display="flex"
          flexDirection="column"
          justifyContent="center"
          offset={{ lg: 2 }}
          value={{ xs: 12, md: 6, lg: 4 }}
          flex={1}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="37px"
            marginBottom="37px"
          >
            <Link
              href="/"
              color="secondary.main"
            >
              <Logo size="large" />
            </Link>
          </Box>
          <LoginForm />
          <Text
            variant="paragraph1"
            tag="p"
            color="tertiary.light"
            textAlign="center"
          >
            {'Não tem uma conta? '}
            <Link
              href="/"
              color="secondary.main"
              onClick={(event) => {
                event.preventDefault();
                websitePageContext.toggleModal(<FormRegister />);
              }}
            >
              Cadastre-se
            </Link>
          </Text>
        </Grid.Column>

        <Grid.Column value={{ xs: 12, md: 6 }}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <img
              align="center"
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
              alt="Telefones mostrando as páginas internas do app"
            />
          </Box>
        </Grid.Column>
      </Grid.Row>
    </Grid.Container>
  );
}
