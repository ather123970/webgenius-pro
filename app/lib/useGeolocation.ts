'use client';

import { useState, useEffect } from 'react';

export interface GeolocationData {
    countryCode: string;
    currency: string;
    currencySymbol: string;
    isPakistan: boolean;
    isLocal: boolean; // Pakistan only (simplified)
    loading: boolean;
}

// Simplified: Only PKR for Pakistan, USD for everyone else
const PKR_TO_USD = 278;

export const useGeolocation = (): GeolocationData => {
    const [geoData, setGeoData] = useState<GeolocationData>({
        countryCode: 'US',
        currency: 'USD',
        currencySymbol: '$',
        isPakistan: false,
        isLocal: false,
        loading: true
    });

    useEffect(() => {
        const detectLocation = async () => {
            try {
                // Try ipwho.is first (more reliable free tier)
                let response = await fetch('https://ipwho.is/');
                let data = await response.json();

                if (!data.success) {
                    // Fallback to ipapi.co
                    response = await fetch('https://ipapi.co/json/');
                    data = await response.json();
                }

                const country = data.country_code || data.countryCode || 'US';
                const isPakistan = country === 'PK';

                setGeoData({
                    countryCode: country,
                    currency: isPakistan ? 'PKR' : 'USD',
                    currencySymbol: isPakistan ? 'Rs ' : '$',
                    isPakistan,
                    isLocal: isPakistan,
                    loading: false
                });

            } catch (error) {
                console.error('Failed to detect location:', error);
                // Default to USD if detection fails
                setGeoData({
                    countryCode: 'US',
                    currency: 'USD',
                    currencySymbol: '$',
                    isPakistan: false,
                    isLocal: false,
                    loading: false
                });
            }
        };

        detectLocation();
    }, []);

    return geoData;
};

// Helper function to format price based on geolocation
// Converts PKR base price to either PKR or USD with 60% markup
export const formatGeoPrice = (
    basePricePKR: number,
    geoData: GeolocationData
): string => {
    if (geoData.isPakistan) {
        // Pakistan: Show original PKR price
        return `${geoData.currencySymbol}${basePricePKR.toLocaleString()}`;
    } else {
        // Non-Pakistan: Convert to USD with 60% markup
        const baseUSD = basePricePKR / PKR_TO_USD;
        const markedUpUSD = baseUSD * 1.6;
        const roundedUSD = Math.ceil(markedUpUSD / 5) * 5; // Round to nearest $5

        return `${geoData.currencySymbol}${roundedUSD.toLocaleString()}`;
    }
};
