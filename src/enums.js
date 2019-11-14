import { formatPhoneNumber } from 'react-phone-number-input'

const ContactType = [
    "Phone",
    "Email",
    "Whatsapp"
]
const ContactTypeDescription = [
    {
        description: "Phone",
        icon: "fa fa-phone",
        href: (value) => "tel:" + value,
        hrefMessage: "Click to call",
        inputType: "tel",
        format: value => value && formatPhoneNumber(value)
    },
    {
        description: "E-mail",
        icon: "fa fa-envelope",
        href: (value) => "mailto:" + value,
        hrefMessage: "Click to send an e-mail",
        inputType: "email",
        format:value=>value

    },
    {
        description: "WhatsApp",
        icon: "fa fa-whatsapp",
        href: (value) => "tel:" + value,
        hrefMessage: "Click to call",
        inputType: "tel",
        format: value => value && formatPhoneNumber(value)



    },
]

export { ContactType, ContactTypeDescription }