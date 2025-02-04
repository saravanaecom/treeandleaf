import { ConstructionOutlined } from '@mui/icons-material';
import APIRoutes from '../routes/APIRoutes';
import {ServerURL} from '../server/serverUrl';

export const API_FetchSettings = async () => {
    let objData = "";
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_SETTINGS_DETAILS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                objData: objData,
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error('No data found.');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};


export const API_FetchSelectSettingsNew = async () => {
    let objData = "";
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_SELECTSETTINGS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                objData: objData,
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
       

        if (!data || !Array.isArray(data.data)) {
            throw new Error('No data found.');
        }
        return data.data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};









export const API_FetchDeliveryTimes = async () => {
    let objData = "";
    let objlist = {
        Comid: ServerURL.COMPANY_REF_ID,
    };
    try {
        const response = await fetch(`${APIRoutes.GET_DELIVERY_TIMES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                objData: objData,
            },
            body: JSON.stringify(objlist)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        if (!data || !Array.isArray(data)) {
            throw new Error('No data found.');
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch details:', error);
        throw error; // Re-throw so the calling function can handle it
    }
};
