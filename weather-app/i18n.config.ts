export default defineI18nConfig(() => ({
    strategy: "no_prefix",
    legacy: false,
    locale: 'fr',
    messages: {
      en: {
        title: {
            current: "Instant Weather",
            daily: "Next Days",
            hourly: "Next Hours",
            favorites: "Your Favorite Locations",
            addLocation: "Add a Location"
          },
          label: {
            addLocation: "Location Name"
          },
          button: {
            add: "Add",
            addCurrentLocation: "Add current position"
          }
      },
      fr: {
        title: {
            current: "Météo Instantanée",
            daily: "Prochains Jours",
            hourly: "Prochaines Heures",
            favorites: "Vos Localisations Favorites",
            addLocation: "Ajouter une Localisation"
          },
          label: {
            addLocation: "Nom de la Localisation"
          },
          button: {
            add: "Ajouter",
            addCurrentLocation: "Ajouter la position actelle"
          }
      }
    }
  }))