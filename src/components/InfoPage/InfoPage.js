import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div className="pageBody">
    <p>
      Welcome to Vennd! Here are some things to keep in mind while using this site:</p>
    <ul>
      <li>The search input field will only search by business name. You must use the category dropdown or widgets to filter results by other parameters. Unfortunately, you can currently only search by one parameter at a time.</li>
      <li>A checkmark icon indicates that the business listing has been reviewed and approved by the administrator.</li>
      <li>A caution icon indicates that the administrator has been informed of a complaint against this business. Currently there are no resources to substantiate these claims.</li>
      <li>Users may save businesses to their favorites.</li>
      <li>Users should only add new businesses with a "brick-and-mortar" storefront and that are not already existing in the directory.</li>
      <li>Users should only vote on businesses based on the demographics they represent.</li>
    </ul>
  </div>
);

export default InfoPage;
