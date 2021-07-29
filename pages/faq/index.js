import FAQScreen from '../../src/components/screens/FAQScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

export default websitePageHOC(FAQScreen, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perguntas Frequentes',
    },
  },
});

export async function getStaticProps() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((respostaDoServer) => respostaDoServer.json())
    .then((respostaConvertida) => respostaConvertida.data);

  return {
    props: {
      faqCategories,
      pageWrapperProps: {
        pageBoxProps: {
          backgroundColor: 'background',
        },
      },
    },
  };
}
