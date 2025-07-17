const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const API_URL = `${API_BASE_URL}/api/donation`;

const ENDPOINTS ={
    POSTDONATION:`${API_URL}/add_donation/`,
    GETDONATION:`${API_URL}/get_donations/`,
    GETDONATIONBYID:`${API_URL}/get_donation_by_id/                                                                                                                                                                                                     `,
    GETCONTRIBUTORLIST:`${API_URL}/get_contributors_list/`,
}
console.log( 'api',API_URL)
export default ENDPOINTS;