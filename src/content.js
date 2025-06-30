export let defaultContent = {
  header: {
    title: "Global Environment & Mining Services LLP"
  },
  home: {
    heading: "Welcome to Global Environment & Mining Services",
    paragraph: "We offer sustainable solutions for mining and environment."
  },
  services: {
    heading: "Our Services",
    paragraph: "We provide consulting, exploration, remediation, and more."
  },
  accreditations: {
    heading: "Our Accreditations",
    paragraph: "Certified and compliant with global standards."
  },
  gallery: {
    heading: "Gallery",
    imageUrls: ["https://via.placeholder.com/300"]
  },
  about: {
    heading: "About Us",
    paragraph: "Dedicated to preserving the environment while supporting industry."
  },
  contact: {
    heading: "Contact Us",
    paragraph: "Reach us at contact@gemservices.com or +91-1234567890"
  }
};


export const setDefaultContent = (data) => {
  defaultContent = data;
};
