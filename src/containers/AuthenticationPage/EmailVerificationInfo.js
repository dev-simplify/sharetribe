import React from 'react';

import { FormattedMessage } from '../../util/reactIntl';

import {
  Heading,
  IconClose,
  IconEmailSent,
  InlineTextButton,
  NamedLink,
  PrimaryButtonInline,
} from '../../components';

import css from './AuthenticationPage.module.css';
import { useHistory } from 'react-router-dom';
import { pathByRouteName } from '../../util/routes';
import { LocalStorageHelper } from '../../util/localStorageHelper';

const EmailVerificationInfo = props => {
  const {
    name,
    email,
    onResendVerificationEmail,
    resendErrorMessage,
    sendVerificationEmailInProgress,
    routeConfiguration,
  } = props;

  const resendEmailLink = (
    <InlineTextButton rootClassName={css.modalHelperLink} onClick={onResendVerificationEmail}>
      <FormattedMessage id="AuthenticationPage.resendEmailLinkText" />
    </InlineTextButton>
  );

  const fixEmailLink = (
    <NamedLink className={css.modalHelperLink} name="ContactDetailsPage">
      <FormattedMessage id="AuthenticationPage.fixEmailLinkText" />
    </NamedLink>
  );

  const history = useHistory();
  const isProvider = LocalStorageHelper.getItem('IS_PROVIDER') === 'true';

  return (
    <div className={css.content}>
      <NamedLink className={css.verifyClose} name="ProfileSettingsPage">
        <span className={css.closeText}>
          <FormattedMessage id="AuthenticationPage.verifyEmailClose" />
        </span>
        <IconClose rootClassName={css.closeIcon} />
      </NamedLink>
      <IconEmailSent className={css.modalIcon} />
      <Heading as="h1" rootClassName={css.modalTitle}>
        <FormattedMessage id="AuthenticationPage.verifyEmailTitle" values={{ name }} />
      </Heading>
      <p className={css.modalMessage}>
        <FormattedMessage id="AuthenticationPage.verifyEmailText" values={{ email }} />
      </p>

      {isProvider && (
        <PrimaryButtonInline
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            history.push(pathByRouteName('NewListingPage', routeConfiguration)); // Used the "NewListingPage" link from routeConfiguration.js
            LocalStorageHelper.removeItem('IS_PROVIDER');
          }}
          style={{ marginTop: '10px' }}
        >
          <FormattedMessage id="ManageListingsPage.createListing" />
        </PrimaryButtonInline>
      )}

      {resendErrorMessage}

      <div className={css.bottomWrapper}>
        <p className={css.modalHelperText}>
          {sendVerificationEmailInProgress ? (
            <FormattedMessage id="AuthenticationPage.sendingEmail" />
          ) : (
            <FormattedMessage id="AuthenticationPage.resendEmail" values={{ resendEmailLink }} />
          )}
        </p>
        <p className={css.modalHelperText}>
          <FormattedMessage id="AuthenticationPage.fixEmail" values={{ fixEmailLink }} />
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationInfo;
