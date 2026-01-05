/**
 * Masks the last 2 digits of a phone number with 'xx'.
 * @param phone The phone number to mask.
 * @returns The masked phone number.
 */
export const maskPhoneNumber = (phone: string): string => {
    if (!phone || phone.length < 2) return phone;
    return phone.slice(0, -2) + 'xx';
};
