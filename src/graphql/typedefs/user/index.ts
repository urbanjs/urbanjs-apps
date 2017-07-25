import user from './user';
import userFacebookRegistration from './user-facebook-registration';
import userMetadata from './user-metadata';
import userPersonalInformation from './user-personal-information';
import userPortfolio from './user-portfolio';
import userSettings from './user-settings';
import userSubscription from './user-subscription';
import userSubscriptionType from './user-subscription-type';

export default `
${user}
${userMetadata}
${userPersonalInformation}
${userPortfolio}
${userFacebookRegistration}
${userSettings}
${userSubscription}
${userSubscriptionType}
`;
