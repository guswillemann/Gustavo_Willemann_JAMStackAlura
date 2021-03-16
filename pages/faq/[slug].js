import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternaScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternaScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternaScreen);

export async function getStaticProps({ params }) {
  const pageSlug = params.slug;
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((response) => response.json())
    .then((responseAsObject) => responseAsObject.data);

  const category = faqCategories.find((faqCategory) => faqCategory.questions.find(
    (question) => question.slug === pageSlug,
  ));
  const question = category.questions.find(
    (faqQuestion) => faqQuestion.slug === pageSlug,
  );

  return {
    props: {
      category,
      question,
      pageWrapperProps: {
        seoProps: {
          headTitle: question.title,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq')
    .then((response) => response.json())
    .then((responseAsObject) => responseAsObject.data);

  const paths = [];

  faqCategories.forEach((faqCategory) => {
    faqCategory.questions.forEach((question) => {
      paths.push({ params: { slug: question.slug } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}
