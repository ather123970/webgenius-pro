'use client';

import { useState, useEffect } from 'react';

export interface GeolocationData {
    countryCode: string;
    currency: string;
    exchangeRate: number;
    isPakistan: boolean;
    isIndia: boolean;
    isLocal: boolean; // Pakistan or India
    loading: boolean;
}

// Exchange rates (approximate market rates)
const RATES: { [key: string]: number } = {
    'USD': 1,
    'PKR': 278,
    'GBP': 0.79,
    'EUR': 0.92,
    'CAD': 1.36,
    'AUD': 1.52,
    'AED': 3.67,
    'SAR': 3.75,
    'INR': 83.5,
};

const CURRENCY_SYMBOLS: { [key: string]: string } = {
    'USD': '$',
    'PKR': 'Rs ',
    'GBP': '£',
    'EUR': '€',
    'CAD': 'C$',
    'AUD': 'A$',
    'AED': 'AED ',
    'SAR': 'SAR ',
    'INR': '₹',
};

export const useGeolocation = (): GeolocationData => {
    const [geoData, setGeoData] = useState<GeolocationData>({
        countryCode: 'US',
        currency: 'USD',
        exchangeRate: 1,
        isPakistan: false,
        isIndia: false,
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
                const currencyCode = data.currency_code || data.currency || 'USD';

                const isPakistan = country === 'PK';
                const isIndia = country === 'IN';
                const isLocal = isPakistan || isIndia;

                // Check if we support this currency, otherwise default to USD
                const finalCurrency = RATES[currencyCode] ? currencyCode : 'USD';
                const finalExchangeRate = RATES[finalCurrency] || 1;

                setGeoData({
                    countryCode: country,
                    currency: finalCurrency,
                    exchangeRate: finalExchangeRate,
                    isPakistan,
                    isIndia,
                    isLocal,
                    loading: false
                });

            } catch (error) {
                console.error('Failed to detect location:', error);
                // Default to USD if detection fails
                setGeoData({
                    countryCode: 'US',
                    currency: 'USD',
                    exchangeRate: 1,
                    isPakistan: false,
                    isIndia: false,
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
export const formatGeoPrice = (
    baseUsdAmount: number,
    geoData: GeolocationData
): string => {
    let baseAmount = baseUsdAmount;

    // Increase rates by 60% for non-PK/IN countries
    if (!geoData.isLocal) {
        baseAmount = baseUsdAmount * 1.6;
    }

    const converted = Math.round(baseAmount * geoData.exchangeRate);

    // Round to nice numbers
    const rounded = geoData.currency === 'PKR'
        ? Math.ceil(converted / 500) * 500
        : Math.ceil(converted / 5) * 5;

    const symbol = CURRENCY_SYMBOLS[geoData.currency] || '$';

    return `${symbol}${new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(rounded)}`;
};

// Helper to get currency symbol
export const getCurrencySymbol = (currency: string): string => {
    return CURRENCY_SYMBOLS[currency] || '$';
};

export { RATES, CURRENCY_SYMBOLS };
