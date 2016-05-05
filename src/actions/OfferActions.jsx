export const CHANGE_OFFER = 'CHANGE_OFFER';

// Action creator for showing Lock
export function changeOffer(data) {
  return {
    type: CHANGE_OFFER,
    offer: data
  };
}
