import React from 'react';
import Button from '../src/components/commons/Button';
import Footer from '../src/components/commons/Footer';
import Menu from '../src/components/commons/Menu';
import Modal from '../src/components/commons/Modal';
import Box from '../src/components/foundation/layout/Box';
import Grid from '../src/components/foundation/layout/Grid';
import Text from '../src/components/foundation/Text';
import FormRegister from '../src/components/patterns/FormRegister';

export default function Home() {
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <Box
      flex={1}
      display="flex"
      flexWrap="wrap"
      flexDirection="column"
      justifyContent="space-between"
      backgroundImage="url(/images/bubbles.svg)"
      backgroundRepeat="no-repeat"
      backgroundPosition="bottom right"
    >
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalState(false)}
      >
        {(modalProps) => (
          <FormRegister modalProps={modalProps} />
        )}
      </Modal>

      <Menu
        onRegisterClick={() => setModalState(true)}
      />

      <Grid.Container
        marginTop={{
          xs: '32px',
          md: '75px',
        }}
      >
        <Grid.Row>
          <Grid.Column
            offset={{ xs: 0, md: 1 }}
            value={{ xs: 12, md: 5 }}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
          >
            <div>
              <Text
                variant="title"
                tag="h1"
                color="tertiary.main"
                textAlign={{
                  xs: 'center',
                  md: 'left',
                }}
              >
                Compartilhe momentos e conecte-se com amigos
              </Text>
              <Text
                variant="paragraph1"
                tag="p"
                color="tertiary.light"
                textAlign={{
                  xs: 'center',
                  md: 'left',
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
              </Text>
              <Button
                variant="primary.main"
                margin={{
                  xs: 'auto',
                  md: 'initial',
                }}
                display="block"
                onClick={() => setModalState(!isModalOpen)}
              >
                Cadastrar
              </Button>
            </div>
          </Grid.Column>
          <Grid.Column
            value={{ xs: 12, md: 6 }}
          >
            <img
              alt="Imagens de um celulares mostrando uma páginan internas do projeto, com o perfil do Cage."
              style={{ display: 'block', margin: 'auto' }}
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid.Container>

      <Footer />
    </Box>
  );
}
