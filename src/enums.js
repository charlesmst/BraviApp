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
        hrefMessage: "Click to call"
    },
    {
        description: "E-mail",
        icon: "fa fa-envelope",
        href: (value) => "mailto:" + value,
        hrefMessage: "Click to send an e-mail"

    },
    {
        description: "WhatsApp",
        icon: "fa fa-whatsapp",
        href: (value) => "tel:" + value,
        hrefMessage: "Click to call"

    },
]

export { ContactType, ContactTypeDescription }