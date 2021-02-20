import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { BrowserRouter } from 'react-router-dom';
import { TranslationsProvider } from '@eo-locale/react';

/** Locale */
import locales from 'common/locale';

/** Utils */
import getLanguage from './common/utils/getLanguage';

/** Routes */
import Routes from './routes';

const query = queryString.parse(window.location.search);

ReactDOM.render(
  <TranslationsProvider
    language={getLanguage(query.language)}
    locales={locales}
  >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </TranslationsProvider>,
  document.getElementById('root'),
);
