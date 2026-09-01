  export const navItemsFallBackObject =  [
    {
      to: "/", label: "Home", hasDropdown: true,
      sub_items: [
        { to: "/#featured", label: "Featured" },
        { to: "/line-of-business", label: "Line of Business" },
        { to: "/#global-presence", label: "Global Presence" },
        { to: "/financial-information", label: "Financial Performance" },
        { to: '/#media', label: 'Media' },
      ]
    },
    {
      to: "/about-us", label: "About Us", hasDropdown: true,
      sub_items: [
        { to: "/about-us#growth", label: "Sustained Growth" },
        { to: "/about-us#offices", label: "Domicile Offices" },
        { to: "/about-us#values", label: "Our Values" },
        { to: "/about-us#brochure", label: "Brochure" },
        { to: "/about-us#board-of-directors", label: "Board Of Directors" },
      ]
    },
    {
      to: "/insights", label: "Insights", hasDropdown: true,
      sub_items: [
        { to: "/insights#press-release", label: "Press Release" },
        { to: "/insights#articles-and-interviews", label: "Articles and Interviews" },
        { to: "/insights#media", label: "Media" },
      ]
    },
    {
      to: "/compliance", label: "Compliance", hasDropdown: true,
      sub_items: [
        { to: "/compliance#culture", label: "Compliance Culture" },
        { to: "/compliance-form", label: "Due Deligence Form" },
        { to: "/compliance#contact", label: "Compliance Contact" },
      ]
    },
    {
      to: "/careers", label: "Careers", hasDropdown: true,
      sub_items: [
        { to: "/careers#why", label: "Why Active Re" },
        { to: "/careers#who", label: "Who We Are" },
        { to: "/careers#what", label: "What Makes Us Different" },
        { to: "/careers#team", label: "Join Our Team" },
      ]
    },
    { to: '/contacts', label: 'Contacts' , hasDropdown: true,
      sub_items: [
        { to: "/contacts#address", label: "Address" },
        { to: "/our-team", label: "Our team" },
        { to: "/contacts#get-in-touch", label: "Get in Touch" },
      ],
    }
  ];