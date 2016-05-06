export const CHANGE_OFFER = 'CHANGE_OFFER';

// Action creator for changing the users offer
export function changeOffer(data) {
  return {
    type: CHANGE_OFFER,
    offer: data,
  };
}
