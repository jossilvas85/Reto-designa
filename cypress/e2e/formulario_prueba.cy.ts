import { error } from 'console';
import {} from 'cypress';
import _ from 'lodash';

interface formField {
  name: string;
  type: string;
}

// describe('Verify inputs', () => {
//   it('Ensures every question has an input', () => {
//     cy.visit('http://localhost:5173/');
//     const formFields: formField[] = GetFieldNamesAndTypes();
//     formFields.forEach((field: formField) => {
//       cy.get(`[data-testid="${field.name}"]`).should('exist');
//     });
//   });
// });

// describe('Trigger inputs', () => {
//   it('Fills every input without considering restrictions', () => {
//     const formFields = GetFieldNamesAndTypes();

//     cy.visit('http://localhost:5173/');
//     // Falta establecer minimo
//     formFields.forEach((field: formField) => {
//       const { type, name } = field;
//       switch (type) {
//         case 'text':
//           TextTypeTest(name);
//           break;
//         case 'number':
//           // Falta establecer minimo
//           NumberTypeTest(name);
//           break;
//         case 'email':
//           EmailTypeTest(name);
//           break;
//         case 'checkbox':
//           CheckboxMarkTest(name);
//           break;
//       }
//     });

//     // Establecer opcion aleatoria
//     cy.get('select').each(($select) => {
//       cy.wrap($select)
//         .find('option')
//         .then(() => {
//           cy.wrap($select).select(1);
//         });
//     });
//   });
// });

// const TextTypeTest = (name: string) => {
//   cy.get(`[data-testid="${name}"]`).type('Tipo texto');

//   // cy.get(`input[type="text"]`).each(($input) => {
//   //   cy.wrap($input).type('Texto de prueba');
//   // });
// };

// const NumberTypeTest = (name: string) => {
//   cy.get(`[data-testid="${name}"]`).type('12345');
//   // cy.get('input[type="number"]').each(($input) => {
//   //   cy.wrap($input).type('1234556');
//   // });
// };

// const EmailTypeTest = (name: string) => {
//   cy.get(`[data-testid="${name}"]`).type('test@gmail.com');
//   // cy.get('input[type="email"]').each(($input) => {
//   //   cy.wrap($input).type('test@gmail.com');
//   // });
// };

// const CheckboxMarkTest = (name: string) => {
//   cy.get(`[data-testid="${name}"]`).check();
//   // cy.get('input[type="checkbox"]').each(($input) => {
//   //   cy.wrap($input).check();
//   // });
// };

describe('REPEATED NUMBER ERROR', () => {
  it('Repeats number on unique number inputs in order to trigger error', () => {
    cy.visit('http://localhost:5173/');

    const categories = GetListNamesByCategory();

    // Fill every list element
    for (const cat in categories) {
      categories[cat].forEach((field: formField) => {
        const { name } = field;
        cy.get(`[data-testid="${name}"]`)
          .should('have.attr', 'type', 'number')
          .type('1');
      });
    }

    // Check every listERROR element
    for (const cat in categories) {
      categories[cat].forEach((field: formField, index) => {
        const { name } = field;
        if (index != 0) {
          cy.get(`[data-testid="${name}_error"]`)
            .invoke('text')
            .should('equal', 'Valor incorrecto o repetido');
        } else {
          cy.get(`[data-testid="${name}_error"]`).should('not.have.text');
        }
      });
    }

    // Check every listERROR element
    for (const cat in categories) {
      categories[cat].forEach((field: formField, index) => {
        if (index != 0) {
          const { name } = field;
          cy.get(`[data-testid="${name}"]`).clear();
          cy.get(`[data-testid="${name}_error"]`).should('not.have.text');
        }
      });
    }
  });
});

const GetListNamesByCategory = () => {
  const formFields = GetFieldNamesAndTypes();
  const categories = {};
  formFields.filter((field: formField) => {
    if (field.name.includes('.') && field.type === 'number') {
      const category = field.name.split('.')[0];
      if (!categories[category]) categories[category] = [];
      categories[category].push(field);
    }
  });

  return categories;
};

const GetFieldNamesAndTypes = () => {
  const names = [];
  TutorFormData().map((element, index) => {
    GetTypesAndNames(element, names);
  });
  return names;
};
const GetTypesAndNames = (data, array) => {
  const submit = [];
  // Verifico si es un arreglo
  if (_.isArray(data)) {
    data.forEach(GetTypesAndNames);
    // Verifico si es un objeto
  } else if (_.isObject(data)) {
    // Recorro todos los elementos del objeto
    const sectionObj = {};
    for (const prop in data) {
      if (data.hasOwnProperty(prop)) {
        // Seccion de atributos (preguntas, etc)
        // Valido si son preguntas las obtengo
        if (prop == 'questions') {
          return data[prop].map((question) => {
            if (question.name != undefined) {
              array.push({ name: question.name, type: question.type });
            } else if (question.rows) {
              question.rows.map((row) =>
                array.push({ name: row.name, type: row.type })
              );
            }
          });
        }
      }
    }
  }
};

function TutorFormData() {
  return [
    {
      section: 'Datos generales',
      validate: 8,
      target: ['new'],
      questions: [
        {
          title: 'Confirma tu campus',
          type: 'select',
          name: 'campus',
          options: [
            'Monterrey',
            'León',
            'Querétaro',
            'Puebla',
            'Sonora Norte',
            'Ciudad Obregón',
            'Guadalajara',
            'TecMilenio',
            'Santa Fe',
            'Ciudad de México',
            'Estado de México',
            'Hidalgo',
            'Toluca',
            'Irapuato',
            'Cuernavaca',
            'San Luis Potosí',
          ],
        },
        {
          title: 'Nombre completo',
          type: 'text',
          name: 'name',
          filter: true,
        },
        {
          title: 'Género',
          type: 'select',
          options: ['Mujer', 'Hombre', 'Otro'],
          name: 'gender',
        },
        {
          title: '¿Cuántos años cumplidos tienes?',
          type: 'number',
          min: 14,
          max: 30,
          name: 'age',
        },
        {
          title: 'País de procedencia',
          type: 'select',
          options: getCountries(),
          name: 'country',
        },
        {
          title: 'Entidad federativa de procedencia',
          type: 'select',
          options: [
            'AGUASCALIENTES',
            'BAJA CALIFORNIA',
            'BAJA CALIFORNIA SUR',
            'CAMPECHE',
            'COAHUILA',
            'COLIMA',
            'CHIAPAS',
            'CHIHUAHUA',
            'CIUDAD DE MEXICO',
            'DURANGO',
            'GUANAJUATO',
            'GUERRERO',
            'HIDALGO',
            'JALISCO',
            'MEXICO',
            'MICHOACAN',
            'MORELOS',
            'NAYARIT',
            'NUEVO LEON',
            'OAXACA',
            'PUEBLA',
            'QUERETARO',
            'QUINTANA ROO',
            'SAN LUIS POTOSI',
            'SINALOA',
            'SONORA',
            'TABASCO',
            'TAMAULIPAS',
            'TLAXCALA',
            'VERACRUZ',
            'YUCATAN',
            'ZACATECAS',
          ],
          hideField: 'country',
          condition: 'México',
          name: 'state',
        },
        {
          title: 'Número telefónico de contacto',
          type: 'text',
          name: 'phone',
        },
        {
          title: 'Año de nacimiento',
          type: 'number',
          name: 'year',
          min: 1980,
          max: 2021,
          hideField: 'country',
          condition: 'México',
          required: false,
        },
        {
          title: 'Mes de nacimiento',
          type: 'number',
          min: 1,
          max: 12,
          name: 'month',
          hideField: 'country',
          condition: 'México',
          required: false,
        },
        {
          title: 'Día de nacimiento',
          type: 'number',
          min: 1,
          max: 31,
          name: 'day',
          hideField: 'country',
          condition: 'México',
          required: false,
        },
        {
          title: 'CURP',
          type: 'text',
          name: 'curp',
          hideField: 'country',
          condition: 'México',
          extra:
            "<label>Si no sabes tu CURP, puedes consultarlo <a target='_blank' href='https://www.gob.mx/curp/'>aquí</a></label>",
        },
      ],
    },
    {
      section: 'Datos generales',
      validate: 1,
      target: ['renew'],
      questions: [
        {
          title: 'Confirma tu campus',
          type: 'select',
          name: 'campus',
          options: [
            'Monterrey',
            'León',
            'Querétaro',
            'Puebla',
            'Sonora Norte',
            'Ciudad Obregón',
            'Guadalajara',
            'TecMilenio',
            'Santa Fe',
            'Ciudad de México',
            'Estado de México',
            'Hidalgo',
            'Toluca',
            'Irapuato',
            'Cuernavaca',
            'San Luis Potosí',
          ],
        },
      ],
    },
    {
      section: 'Trayectoria académica',
      validate: 16,
      target: ['new'],
      questions: [
        {
          title: '¿Cuál fue tu promedio final de bachillerato o preparatoria?',
          type: 'number',
          min: 6,
          max: 10,
          step: 0.1,
          name: 'grade',
        },
        {
          title: '¿Qué carrera estudias?',
          type: 'select',
          name: 'career',
          options: getCareers(),
        },
        {
          title: '¿Cuántos semestres has cursados en el Tec?',
          type: 'number',
          name: 'semesters',
          min: 1,
          max: 14,
          step: 1,
        },
        {
          title:
            '¿Cuál es tu promedio acumulado en tu carrera profesional en el Tec?',
          type: 'number',
          min: 6,
          max: 10,
          step: 0.1,
          name: 'accumulated_grade',
        },

        {
          title:
            'Ordena del 1 al 5 el siguiente listado para señalar ¿cuál consideras que es tu nivel de dominio de las siguientes disciplinas? Comienza por la que consideras tienes mayor dominio (1) y termina por la que te parezca tienes menor dominio (5)',
          type: 'list',
          max: 5,
          rows: [
            {
              title:
                'Ciencias Experimentales (biología, química, física, ecología, etc.)',
              type: 'number',
              name: 'knowledge.experimental_sciences',
            },
            {
              title:
                'Ciencias Sociales (historia, estructura socioeconómica, tecnología y sociedad, etc.)',
              type: 'number',
              name: 'knowledge.social_sciences',
            },
            {
              title: 'Comunicación (español)',
              type: 'number',
              name: 'knowledge.communication',
            },
            {
              title: 'Humanidades (filosofía, ética, literatura, etc.)',
              type: 'number',
              name: 'knowledge.human_studies',
            },
            {
              title:
                'Matemáticas (álgebra, geometría, trigonometría, cálculo, estadística, etc.)',
              type: 'number',
              name: 'knowledge.math',
            },
          ],
        },
        {
          title:
            '¿Tienes algún tipo de beca o apoyo financiero como alumno del Tec?',
          sectionTitle: 'EDUCACIÓN MEDIA SUPERIOR (Bachillerato)',
          type: 'select',
          options: [
            'Líderes del mañana',
            'Talento académico',
            'Hijo/a empleado/a TEC',
            'Beca préstamo',
            'Beca de extranjero',
            'Deportiva',
            'Liderazgo o emprendedor@',
            'Cultural',
            'Otro',
            'No, ninguna beca',
          ],
          name: 'scholarship',
        },
        {
          title: '¿Cuál es el nivel máximo de estudios que esperas alcanzar?',
          sectionTitle: 'EDUCACIÓN MEDIA SUPERIOR (Bachillerato)',
          type: 'select',
          options: ['Licenciatura', 'Especialidad', 'Maestría', 'Doctorado'],
          name: 'max_study',
        },
        {
          title:
            '¿Con qué frecuencia utilizas las siguientes herramientas para realizar tus actividades académicas?',
          type: 'table',
          rows: [
            {
              title: 'Celular',
              type: 'select',
              name: 'usage.cellphone',
              options: ['Mucho', 'Bastante', 'Poco', 'Nada'],
            },
            {
              title: 'Tableta (ipad)',
              type: 'select',
              name: 'usage.tablet',
              options: ['Mucho', 'Bastante', 'Poco', 'Nada'],
            },
            {
              title: 'Computadora personal',
              type: 'select',
              name: 'usage.personal_pc',
              options: ['Mucho', 'Bastante', 'Poco', 'Nada'],
            },
            {
              title: 'Computadora compartida',
              type: 'select',
              name: 'usage.shared_pc',
              options: ['Mucho', 'Bastante', 'Poco', 'Nada'],
            },
          ],
        },
        {
          title:
            '¿Cuántos libros hay en tu casa? (No incluyas revistas, periódicos o libros de texto)',
          type: 'select',
          options: [
            'Ninguno',
            '1 a 10',
            '11 a 25',
            '26 a 50',
            '51 a 100',
            '101 a 200',
            '201 a 500',
            'Más de 500',
          ],
          name: 'books_at_home',
        },
      ],
    },
    {
      section: 'Sobre los desafíos principales del Sistema Educativo Mexicano',
      validate: 16,
      target: ['new'],
      questions: [
        {
          title:
            'De acuerdo con tu opinión, ordena del 1 al 6 el siguiente listado para señalar ¿cuáles son los desafíos más importantes del Sistema Educativo Mexicano? Comienza por el que consideras más importante (1) y termina por el que te parezca menos importante (6)',
          type: 'list',
          max: 6,
          rows: [
            {
              title: 'Las condiciones de infraestructura de las escuelas',
              type: 'number',
              name: 'education_system.infraesctructure',
            },
            {
              title:
                'La distribución de los recursos monetarios de las escuelas',
              type: 'number',
              name: 'education_system.monetary_resources',
            },
            {
              title: 'Los contenidos que se enseñan en la escuela',
              type: 'number',
              name: 'education_system.school_content',
            },
            {
              title: 'Las habilidades de enseñanza de los docentes',
              type: 'number',
              name: 'education_system.education_skill',
            },
            {
              title:
                'Poca relación entre los contenidos educativos y la vida real',
              type: 'number',
              name: 'education_system.few_related_content',
            },
            {
              title:
                'Los materiales académicos (libros, computadora, internet, etc.) con los que cuentan los estudiantes en su casa para continuar sus estudios',
              type: 'number',
              name: 'education_system.academic_resources',
            },
          ],
        },
        {
          title:
            'Ordena del 1 al 10 el siguiente listado para compartir tu opinión sobre ¿cuáles son los desafíos más importantes que enfrentan las y los jóvenes mexicanos para tener éxito en su trayectoria académica? Comienza por el que consideras más importante (1) y termina por el que te parezca menos importante (10).',
          type: 'list',
          max: 10,
          rows: [
            {
              title: 'Falta de clases presenciales por la pandemia',
              type: 'number',
              name: 'academic_trayectory.face_to_face_classes',
            },
            {
              title: 'Problemas para acceder a dispositivos tecnológicos',
              type: 'number',
              name: 'academic_trayectory.technology_access',
            },
            {
              title:
                'Falta de actualización de los contenidos que se enseñan en la escuela',
              type: 'number',
              name: 'academic_trayectory.updated_content',
            },
            {
              title: 'Dificultad para relacionarse con las y los docentes',
              type: 'number',
              name: 'academic_trayectory.teachers_relation',
            },
            {
              title: 'Problemas de convivencia con las y los compañeros',
              type: 'number',
              name: 'academic_trayectory.students_relation',
            },
            {
              title:
                'Poca relación entre los materiales escolares y la vida real',
              type: 'number',
              name: 'academic_trayectory.related_content',
            },
            {
              title: 'Falta de motivación para continuar con los estudios',
              type: 'number',
              name: 'academic_trayectory.study_motivation',
            },
            {
              title: 'Falta de recursos económicos',
              type: 'number',
              name: 'academic_trayectory.economic_resources',
            },
            {
              title: 'Poco o nulo de apoyo de sus padres',
              type: 'number',
              name: 'academic_trayectory.parent_support',
            },
            {
              title: 'Afectaciones emocionales',
              type: 'number',
              name: 'academic_trayectory.emotional_affectations',
            },
          ],
        },
      ],
    },
    {
      section: 'Expectativas del servicio social',
      validate: 6,
      target: ['new'],
      questions: [
        {
          title:
            '¿Qué resultados esperas obtener con tu participación en este programa de tutorías académicas?',
          type: 'text',
          name: 'expectations.results',
        },
        {
          title:
            '¿Cuál es tu motivación para querer ingresar a este proyecto de servicio social? ',
          type: 'text',
          name: 'expectations.motive',
        },
        {
          title:
            '¿Qué impacto crees que pueden tener en otras personas tus actividades de servicio social?',
          type: 'text',
          name: 'expectations.impact',
        },
        {
          title:
            '¿Tienes experiencia impartiendo clases o tutorías académicas? ',
          type: 'select',
          options: [
            'Sí, de manera formal',
            'Sí, de manera informal',
            'No, ninguna',
          ],
          name: 'expectations.experience',
        },
        {
          title:
            'Además del servicio social, ¿realizas alguna actividad co-curricular?',
          type: 'select',
          options: [
            'Sí, deportiva',
            'Sí, cultural',
            'Sí, de liderazgo o voluntariado',
            'Todas las anteriores',
            'Otra',
            'No realizó alguna actividad',
          ],
          name: 'expectations.cocurricular_activity',
        },
        {
          title: '¿Trabajas o realizas prácticas profesionales?',
          type: 'select',
          options: ['Sí', 'No'],
          name: 'expectations.work',
        },
      ],
    },
    {
      section: 'Servicio Social I',
      validate: 10,
      target: ['new', 'renew'],
      questions: [
        {
          title:
            'Puedo captar confacilidad si otra persona quiere participar en una conversación',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.conversationengagement',
        },
        {
          title:
            'Puedo identificar fácilmente si una persona dice una cosa, cuando en realidad quiere decir otra',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.conversationunderstanding',
        },
        {
          title: 'Tengo facilidad para predecir cómo se sentirá otra persona',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.feelings',
        },
        {
          title:
            'Me doy cuenta cuando estoy siendo entrometido, incluso si la otra persona no me lo dice',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.nousy',
        },
        {
          title:
            'Puedo darme cuenta si otra persona está ocultando sus verdaderas emociones',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.kept',
        },
        {
          title: 'Me resulta fácil ponerme en el lugar de otra persona',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.empathic',
        },
        {
          title:
            'Si digo algo que le ofenda a alguien, pienso que el problema es suyo, no mío',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.ofensive',
        },
        {
          title:
            'Mis amistades suelen hablarme de sus problemas porque dicen que realmente les comprendo',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.undestanding',
        },
        {
          title:
            'A menudo la gente dice que soy insensible, aunque yo no veo por qué',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.insensitive',
        },
        {
          title:
            'Tiendo a involucrarme emocionalmente en los problemas de mis amigos',
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialservicei.engagement',
        },
      ],
    },
    {
      section: 'Servicio Social II',
      validate: 4,
      target: ['new', 'renew'],
      questions: [
        {
          title: `En esta experiencia de servicio
                      social tendré la oportunidad de ser sensible ante la
                      vulnerabilidad, el dolor y el sufrimiento del otro y actuar
                      con el fin de eliminarlo, aliviarlo o evitarlo, a través de acciones
                      justas alejadas de la pasión egoísta y/o de sentimientos de superioridad.`,
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialserviceii.sensitive',
        },
        {
          title: `En esta experiencia de servicio
                      social tendré la oportunidad de actuar con responsabilidad, con
                      el fin de asegurar el bienestar de la colectividad, a través de
                      acciones que garantizan el acceso a los derechos humanos,
                      el empoderamiento de los ciudadanos y de las
                      comunidades, así como el cuidado, mantenimiento y uso
                      sostenible de los recursos y bienes comunes.`,
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialserviceii.responsable',
        },
        {
          title: `En esta experiencia de servicio social tendré la oportunidad de
                      actuar con respeto ante la diversidad de género, sexual,
                      étnica, cultural, de capacidades, generacional, religiosa y
                      socioeconómica mostrando una cordial aceptación de las
                      diferencias y la capacidad para gestionar de manera razonable
                      los conflictos.`,
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialserviceii.respectful',
        },
        {
          title: `En esta experiencia de servicio social tendré la oportunidad de
                      promover soluciones cooperativas en problemas o coordinar acciones colectivas
                      con el fin de mejorar la calidad de vida de la sociedad,
                      fomentando la cultura de la legalidad, los derechos
                      humanos y/o el fortalecimiento de la democracia.`,
          type: 'select',
          options: [
            'Totalmente en desacuerdo',
            'En desacuerdo',
            'De acuerdo',
            'Totalmente de acuerdo',
          ],
          name: 'socialserviceii.promote',
        },
      ],
    },
    {
      section: 'Servicio Social III',
      validate: 10,
      target: ['new', 'renew'],
      questions: [
        {
          title: `Hablo acerca de la importancia de
                      tener valores morales (ser buena persona).`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.values',
        },
        {
          title: `Tengo clara la importancia de actuar
                      con un fuerte sentido del deber (ser comprometido).`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.commited',
        },
        {
          title: `Trato a los demás como personas y
                      no solo como otros miembros de un grupo.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.people',
        },
        {
          title: `Tengo en cuenta las consecuencias
                      éticas de mi comportamiento y mis decisiones.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.ethics',
        },
        {
          title: `Comunico con entusiasmo los
                      objetivos que deben conseguirse en una misión o tarea colectiva.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.enthusiastic',
        },
        {
          title: `Espero a que las cosas vayan mal antes de actuar.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.pesimistic',
        },
        {
          title: `Busco diferentes perspectivas al
                      momento de solucionar problemas.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.problomsolver',
        },
        {
          title: `Resalto lo importante que es
                      respetar a los demás y trabajar en
                      equipo.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.respectful',
        },
        {
          title: `Intento ir más allá de mi propio
                      interés en beneficio de los demás.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.teamplayer',
        },
        {
          title: `Apoyo a los demás solamente
                      cuando hacen bien las tareas y actividades.`,
          type: 'select',
          options: ['Nunca', 'Pocas veces', 'Muchas veces', 'Siempre'],
          name: 'socialserviceiii.tasks',
        },
      ],
    },

    {
      section: `Selecciona un horario en el que tienes mayor disponibilidad de impartir tus tutorías en cada
              bloque (un horario para comunicación --- 5 semanas / un horario para matemáticas ---5 semanas)`,
      validate: 4,
      target: ['new', 'renew'],
      questions: [
        {
          title: `Horario comunicación (27 marzo-6 mayo) – Recuerda empatar tu ventana de horario para el
                      bloque de comunicación con tus horarios disponibles de tu bloque 2 de Tec21 (en caso de ser
                      Tec20 empatalos con tu horario semestral).`,
          type: 'select',
          options: [
            'Entre semana matutino',
            'Entre semana vespertino',
            'Sábado matutino',
            'Sábado vespertino',
          ],
          name: 'schedule_comm',
        },
        {
          title: `Horario Matemáticas (15 mayo-18 junio) Recuerda empatar tu ventana de horario para el bloque
                      de matemáticas con tus horarios disponibles de tu bloque 3 de Tec21 (en caso de ser Tec20
                      empatalos con tu horario semestral).`,
          type: 'select',
          options: [
            'Entre semana matutino',
            'Entre semana vespertino',
            'Sábado matutino',
            'Sábado vespertino',
          ],
          name: 'schedule_math',
        },
      ],
    },
    {
      section: 'Inscripción a la plataforma de cursos (CANVAS)',
      validate: 11,
      target: ['new'],
      questions: [
        {
          title: 'Correo electrónico institucional',
          type: 'email',
          name: 'email',
        },
        {
          title: 'Valida tu correo electrónico institucional',
          type: 'email',
          name: 'email2',
          equalTo: 'email',
        },
        {
          title: 'Correo personal',
          type: 'email',
          name: 'personal_email',
        },
        {
          title:
            'Crea una nueva contraseña EXCLUSIVA para el proyecto Aprendizaje para Todos ',
          type: 'text',
          name: 'password',
          min: 8,
        },
        {
          title:
            'Autorizo ser contactado por medio del correo o teléfono proporcionados ',
          options: ['Sí'],
          type: 'checkbox',
          name: 'agreement.authorize',
        },
        {
          title:
            'Estoy de acuerdo en que el mentor de los estudiantes de media superior pueda contactarme por correo electrónico y /o teléfono para dar seguimiento a sus alumnos',
          options: ['Sí'],
          type: 'checkbox',
          name: 'agreement.contact',
        },
        {
          title:
            'Me comprometo a fungir como tutor académico en un modelo entre estudiante TEC/Tecmilenio a estudiante de preparatoria pública, dando asesorías en español y matemáticas del <% start_date %> a <% end_date %>',
          type: 'checkbox',
          replace: true,
          options: ['Sí'],
          name: 'agreement.agreement',
        },
        {
          title:
            'Manifiesto que no estoy inscrito en otro programa de servicio social de manera simultánea ',
          options: ['Sí'],
          type: 'checkbox',
          name: 'agreement.program',
        },
        {
          title:
            'Entiendo que no cumplir con los horarios acordados para impartir la asesoría será motivo de baja del servicio social  ',
          options: ['Sí'],
          type: 'checkbox',
          name: 'agreement.assistance',
        },
        {
          title:
            'Estoy de acuerdo en que debo cumplir con al menos 80% de las actividades para que me sean validadas las horas proporcionales al servicio social prestado. En caso de porcentaje menor, no se me validará ninguna hora.  ',
          options: ['Sí'],
          type: 'checkbox',
          name: 'agreement.responsability',
        },
        {
          title:
            'Tutor, te pedimos crear un grupo de whatsapp al que se unirán tus estudiantes. Coloca aquí la liga de invitación al grupo ',
          type: 'text',
          name: 'agreement.whatsapp',
        },
      ],
    },
  ];
}

function getCareers() {
  return [
    'Arquitecto entrando por Ambiente Construido',
    'Arquitecto entrando por Estudios Creativos',
    'Bachelor in Global Business',
    'Ingeniero Biomédico',
    'Ingeniero Civil entrando por Ambiente Construido',
    'Ingeniero Civil entrando por Ingeniería-Innovación y Transformación',
    'Ingeniero en Alimentos',
    'Ingeniero en Biosistemas Agroalimentarios',
    'Ingeniero en Biotecnología',
    'Ingeniero en Ciencia de Datos y Matemáticas',
    'Ingeniero en Desarrollo Sustentable',
    'Ingeniero en Electrónica',
    'Ingeniero en Innovación y Desarrollo',
    'Ingeniero en Mecatrónica',
    'Ingeniero en Nanotecnología',
    'Ingeniero en Robótica y Sistemas Digitales',
    'Ingeniero en Tecnologías Computacionales',
    'Ingeniero en Transformación Digital de Negocios',
    'Ingeniero Físico Industrial',
    'Ingeniero Industrial y de Sistemas',
    'Ingeniero Mecánico',
    'Ingeniero Químico',
    'Licenciado en Arte Digital',
    'Licenciado en Biociencias',
    'Licenciado en Comunicación',
    'Licenciado en Contaduría Pública y Finanzas',
    'Licenciado en Derecho',
    'Licenciado en Desarrollo de Talento y Cultura Organizacional',
    'Licenciado en Diseño',
    'Licenciado en Economía',
    'Licenciado en Emprendimiento',
    'Licenciado en Estrategia y Transformación de Negocios',
    'Licenciado en Finanzas',
    'Licenciado en Gobierno y Transformación Pública',
    'Licenciado en Innovación Educativa',
    'Licenciado en Inteligencia de Negocios',
    'Licenciado en Letras Hispánicas',
    'Licenciado en Mercadotecnia',
    'Licenciado en Negocios Internacionales',
    'Licenciado en Nutrición y Bienestar Integral',
    'Licenciado en Periodismo',
    'Licenciado en Psicología Clínica y de la Salud',
    'Licenciado en Relaciones Internacionales',
    'Licenciado en Tecnología y Producción Musical',
    'Licenciado en Urbanismo',
    'Médico Cirujano',
    'Médico Cirujano Odontólogo',
    'Otro',
  ];
}

function getCountries() {
  return [
    'México',
    'Afganistán',
    'Albania',
    'Alemania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua y Barbuda',
    'Antillas Holandesas',
    'Arabia Saudita',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaiyán',
    'Bahamas',
    'Bahrein',
    'Bangladesh',
    'Barbados',
    'Bélgica',
    'Belice',
    'Benín',
    'Bermudas',
    'Bielorrusia',
    'Bolivia',
    'Bosnia y Herzegovina',
    'Botsuana',
    'Brasil',
    'Brunéi',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Bután',
    'Cabo Verde',
    'Camboya',
    'Camerún',
    'Canadá',
    'Chad',
    'Chile',
    'China',
    'Chipre',
    'Colombia',
    'Comores',
    'Congo (Brazzaville)',
    'Congo (Kinshasa)',
    'Cook, Islas',
    'Corea del Norte',
    'Corea del Sur',
    'Costa de Marfil',
    'Costa Rica',
    'Croacia',
    'Cuba',
    'Dinamarca',
    'Djibouti, Yibuti',
    'Ecuador',
    'Egipto',
    'El Salvador',
    'Emiratos Árabes Unidos',
    'Eritrea',
    'Eslovaquia',
    'Eslovenia',
    'España',
    'Estados Unidos',
    'Estonia',
    'Etiopía',
    'Feroe, Islas',
    'Filipinas',
    'Finlandia',
    'Fiyi',
    'Francia',
    'Gabón',
    'Gambia',
    'Georgia',
    'Ghana',
    'Gibraltar',
    'Granada',
    'Grecia',
    'Groenlandia',
    'Guadalupe',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Ecuatorial',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungría',
    'India',
    'Indonesia',
    'Irak',
    'Irán',
    'Irlanda',
    'Isla Pitcairn',
    'Islandia',
    'Islas Salomón',
    'Islas Turcas y Caicos',
    'Islas Virgenes Británicas',
    'Israel',
    'Italia',
    'Jamaica',
    'Japón',
    'Jersey',
    'Jordania',
    'Kazajstán',
    'Kenia',
    'Kirguistán',
    'Kiribati',
    'Kuwait',
    'Laos',
    'Lesotho',
    'Letonia',
    'Líbano',
    'Liberia',
    'Libia',
    'Liechtenstein',
    'Lituania',
    'Luxemburgo',
    'Macedonia',
    'Madagascar',
    'Malasia',
    'Malawi',
    'Maldivas',
    'Malí',
    'Malta',
    'Man, Isla de',
    'Marruecos',
    'Martinica',
    'Mauricio',
    'Mauritania',
    'México',
    'Moldavia',
    'Mónaco',
    'Mongolia',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Nicaragua',
    'Níger',
    'Nigeria',
    'Norfolk Island',
    'Noruega',
    'Nueva Caledonia',
    'Nueva Zelanda',
    'Omán',
    'Países Bajos, Holanda',
    'Pakistán',
    'Panamá',
    'Papúa-Nueva Guinea',
    'Paraguay',
    'Perú',
    'Polinesia Francesa',
    'Polonia',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reino Unido',
    'República Checa',
    'República Dominicana',
    'Reunión',
    'Ruanda',
    'Rumanía',
    'Rusia',
    'Sáhara Occidental',
    'Samoa',
    'San Cristobal y Nevis',
    'San Marino',
    'San Pedro y Miquelón',
    'San Tomé y Príncipe',
    'San Vincente y Granadinas',
    'Santa Elena',
    'Santa Lucía',
    'Senegal',
    'Serbia y Montenegro',
    'Seychelles',
    'Sierra Leona',
    'Singapur',
    'Siria',
    'Somalia',
    'Sri Lanka',
    'Sudáfrica',
    'Sudán',
    'Suecia',
    'Suiza',
    'Surinam',
    'Swazilandia',
    'Tadjikistan',
    'Tailandia',
    'Taiwan',
    'Tanzania',
    'Timor Oriental',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad y Tobago',
    'Túnez',
    'Turkmenistan',
    'Turquía',
    'Tuvalu',
    'Ucrania',
    'Uganda',
    'Uruguay',
    'Uzbekistán',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Wallis y Futuna',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];
}
