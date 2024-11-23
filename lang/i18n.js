// Locale translations.
const locales = {

  // ES
  es: {
    contact: "Contacto",
    header: {
      logIn: "Iniciar sesión",
      logOut: "Cerrar sesión",
      navbar: {
        testAndPrograms: "Pruebas y programas",
        investigation: "Investigación",
        lines: "Líneas de<br>investigación",
        projects: "Proyectos",
        publications: "Publicaciones",
        thesis: "Tesis",
        tfgAndTfm: "TFG / TFM",
        divulgation: "Divulgación",
        formation: "Formación",
        catalog: "Catálogo",
        intranet: "Intranet",
        userManagement: "Gestión usuarios",
        membersManagement: "Gestión miembros",
        catalogManagement: "Gestión catálogo",
        formationManagement: "Gestión formación",
        divulgationManagement: "Gestión divulgación",
        pypManagement: "Gestión PyP"
      }
    },
    footer: {
      accesibility: "Accesibilidad",
      legalAdvice: "Aviso legal",
      dataProtection: "Protección de datos",
      group: {
        faculty: "Edificio de Facultades",
        location: "Las Lagunas, s/n<br>32004 Ourense",
        supportArea: "Área de apoyo",
        box: "Caja de quejas, sugerencias y felicitaciones",
      },
      uvigo: {
        seeMore: "Ver más",
        information: "Información",
        campusOurense: "Campus de Ourense",
        campusAgua: "Campus del Agua",
        campusPontevedra: "Campus de Pontevedra",
        campusCrea: "Campus CREA",
        campusVigo: "Campus de Vigo",
        vigoTech: "Vigo Tecnológico",
        otherWebs: "Otras webs intitucionales",
        campusMar: "Campus del Mar",
        transparency: "Transparencia",
        emergency: "Emergencias",
        socialWall: "Muro social",
      }
    },
    us: {
      title: "Quiénes somos",
      presentationTitle: "Presentación",
      membersTitle: "Miembros",
      linkInfoMember: "Más información",
    }
  },
  // EN
  en: {
    contact: "Contact",
    header: {
      logIn: "Log in",
      logOut: "Log out",
      navbar: {
        testAndPrograms: "Tests and programs",
        investigation: "Research",
        lines: "Research<br>lines",
        projects: "Projects",
        publications: "Publications",
        thesis: "Thesis",
        tfgAndTfm: "TFG / TFM",
        divulgation: "Divulgation",
        formation: "Formation",
        catalog: "Catalog",
        intranet: "Intranet",
        userManagement: "User management",
        membersManagement: "Members management",
        catalogManagement: "Catalog management",
        formationManagement: "Formation management",
        divulgationManagement: "Divulgation management",
        pypManagement: "PyP management"
      }
    },
    footer: {
      accesibility: "Accessibility",
      legalAdvice: "Legal advice",
      dataProtection: "Data protection",
      group: {
        faculty: "Faculty Building",
        location: "Las Lagunas, s/n<br>32004 Ourense",
        supportArea: "Support area",
        box: "Complaints, suggestions and congratulations box",
      },
      uvigo: {
        seeMore: "See more",
        information: "Information",
        campusOurense: "Ourense Campus",
        campusAgua: "Water Campus",
        campusPontevedra: "Pontevedra Campus",
        campusCrea: "CREA Campus",
        campusVigo: "Vigo Campus",
        vigoTech: "Vigo Technological",
        otherWebs: "Other institutional websites",
        campusMar: "Sea Campus",
        transparency: "Transparency",
        emergency: "Emergencies",
        socialWall: "Social wall",
      }
    },
    us: {
      title: "Who we are",
      presentationTitle: "Presentation",
      membersTitle: "Members",
      linkInfoMember: "More information",
    }
  },

  // GL
  gl: {
    contact: "Contacto",
    header: {
      logIn: "Iniciar sesión",
      logOut: "Cerrar sesión",
      navbar: {
        testAndPrograms: "Probas e programas",
        investigation: "Investigación",
        lines: "Liñas de<br>investigación",
        projects: "Proxectos",
        publications: "Publicacións",
        thesis: "Teses",
        tfgAndTfm: "TFG / TFM",
        divulgation: "Divulgación",
        formation: "Formación",
        catalog: "Catálogo",
        intranet: "Intranet",
        userManagement: "Xestión usuarios",
        membersManagement: "Xestión membros",
        catalogManagement: "Xestión catálogo",
        formationManagement: "Xestión formación",
        divulgationManagement: "Xestión divulgación",
        pypManagement: "Xestión PyP"
      }
    },
    footer: {
      accesibility: "Accesibilidade",
      legalAdvice: "Aviso legal",
      dataProtection: "Protección de datos",
      group: {
        faculty: "Edificio de Facultades",
        location: "As Lagunas, s/n<br>32004 Ourense",
        supportArea: "Área de apoio",
        box: "Caixa de queixas, suxerencias e felicitacións",
      },
      uvigo: {
        seeMore: "Ver máis",
        information: "Información",
        campusOurense: "Campus de Ourense",
        campusAgua: "Campus da Auga",
        campusPontevedra: "Campus de Pontevedra",
        campusCrea: "Campus CREA",
        campusVigo: "Campus de Vigo",
        vigoTech: "Vigo Tecnolóxico",
        otherWebs: "Outras webs institucionais",
        campusMar: "Campus do Mar",
        transparency: "Transparencia",
        emergency: "Emerxencias",
        socialWall: "Muro social",
      }
    },
    us: {
      title: "Quen somos",
      presentationTitle: "Presentación",
      membersTitle: "Membros",
      linkInfoMember: "Máis información",
    }
  },
};

const availableLocales = ['es', 'en', 'gl'];
const defaultLanguage = 'es';

function resolveLanguage(language) {
  if(language && availableLocales.includes(language.toLowerCase())) {
    return language;
  }

  const sessionLanguage = sessionStorage.getItem('language');
  if (sessionLanguage && availableLocales.includes(sessionLanguage)) {
    return sessionLanguage;
  }

  const windowLanguage = (window.navigator.userLanguage || window.navigator.language).substr(0, 2);
  if (windowLanguage && availableLocales.includes(windowLanguage)) {
    return windowLanguage;
  }
  
  return defaultLanguage;
}

export function setPageLanguage(language) {
  const pageLanguage = resolveLanguage(language);
  sessionStorage.setItem('language', pageLanguage);

  // Get all page elements to be translated.
  const elements = document.querySelectorAll('[data-i18n]');
  
  // Get JSON object of translations.
  const json = locales[pageLanguage];
  
  // On each element, found the translation from JSON file & update.
  elements.forEach((element, _) => {
    const key = element.getAttribute('data-i18n');
    let text = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);
  
    // Does this text have any variables? (eg {something})
    const variables = text.match(/{(.*?)}/g);
    if (variables) {
  
      // Iterate each variable in the text.
      variables.forEach((variable) => {
  
        // Filter all `data-*` attributes for this element to find the matching key.
        Object.entries(element.dataset).filter(([key, value]) => {
          if (`{${key}}` === variable) {
            try {
              // Attempt to run actual JavaScript code.
              text = text.replace(`${variable}`, new Function(`return (${value})`)());
            } catch (error) {
              // Probably just static text replacement.
              text = text.replace(`${variable}`, value);
            }
          }
        })
      });
    }
  
    // Regular text replacement for given locale.
    element.innerHTML = text;
  });
  
  // Set <html> tag lang attribute.
  const htmlElement = document.querySelector('html');
  htmlElement.setAttribute('lang', pageLanguage);
}

export function getPageLanguage() {
  return sessionStorage.getItem('language') ?? defaultLanguage;
}

