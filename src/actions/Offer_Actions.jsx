export const CHANGE_OFFER = 'CHANGE_OFFER';
export const CLICK_JOB = 'CLICK_JOB';
export const CLOSE_JOB = 'CLOSE_JOB';
export const TOGGLE_CHART = 'TOGGLE_CHART';

// Action creator for changing the users offer
export function changeOffer(data) {
  return {
    type: CHANGE_OFFER,
    offer: data,
  };
}

// Action create to toggle the type of chart shown on page
export function toggleChart(dataType) {
  return {
    type: TOGGLE_CHART,
    dataType,
  };
}
