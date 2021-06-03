/// <reference types="cypress" />

import NewPostFormObject from '../../../../src/components/patterns/NewPostForm/NewPostForm.Object';
import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';
import ProfileScreenPageObject from '../../../../src/components/screens/app/ProfileScreen/ProfileScreen.pageObject';

describe('/pages/app/profile/', () => {
  beforeEach(() => {
    const loginScreen = new LoginScreenPageObject(cy);
    loginScreen
      .fillLoginForm({ user: 'integrationtester', password: 'senhasegura' })
      .submitLoginForm();
  });
  describe('create a new post from profile', () => {
    it('opens the new post window and submit a new post', () => {
      const imageUrl = 'https://placedog.net/500';
      const description = new Date().toString();

      const profileScreen = new ProfileScreenPageObject(cy);
      profileScreen.openNewPostWindow();

      const newPostForm = new NewPostFormObject(cy);
      newPostForm
        .selectImg(imageUrl)
        .goToNextStep()
        .selectFilter()
        .goToNextStep()
        .describePost(description)
        .submitPost();

      cy.get(`[data="description-${description}"]`).should('exist');
    });
  });
});
