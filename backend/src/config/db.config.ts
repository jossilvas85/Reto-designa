import mongoose, { mongo } from 'mongoose';

const PORT = process.env.DB_PORT || 27017;

export const ConnectDB = async () => {
  await mongoose
    .connect(
      `mongodb://127.0.0.1:${PORT}/registros
  `
    )
    .then(() => {
      console.log(`Database connected, mongoose runing on port ${PORT}`);
    });
};
const Schema = mongoose.Schema;
// const { ObjectId } = Schema;

// Preguntas
const PersonaSchema = new Schema({
  campus: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  curp: { type: String, required: true },
  grade: { type: String, required: true },
  career: { type: String, required: true },
  semesters: { type: String, required: true },
  accumulated_grade: { type: String, required: true },
  'knowledge.experimental_sciences': { type: String, required: true },
  'knowledge.social_sciences': { type: String, required: true },
  'knowledge.communication': { type: String, required: true },
  'knowledge.human_studies': { type: String, required: true },
  'knowledge.math': { type: String, required: true },
  scholarship: { type: String, required: true },
  max_study: { type: String, required: true },
  'usage.cellphone': { type: String, required: true },
  'usage.tablet': { type: String, required: true },
  'usage.personal_pc': { type: String, required: true },
  'usage.shared_pc': { type: String, required: true },
  books_at_home: { type: String, required: true },
  'education_system.infraesctructure': { type: String, required: true },
  'education_system.monetary_resources': { type: String, required: true },
  'education_system.school_content': { type: String, required: true },
  'education_system.education_skill': { type: String, required: true },
  'education_system.few_related_content': { type: String, required: true },
  'education_system.academic_resources': { type: String, required: true },
  'academic_trayectory.face_to_face_classes': { type: String, required: true },
  'academic_trayectory.technology_access': { type: String, required: true },
  'academic_trayectory.updated_content': { type: String, required: true },
  'academic_trayectory.teachers_relation': { type: String, required: true },
  'academic_trayectory.students_relation': { type: String, required: true },
  'academic_trayectory.related_content': { type: String, required: true },
  'academic_trayectory.study_motivation': { type: String, required: true },
  'academic_trayectory.economic_resources': { type: String, required: true },
  'academic_trayectory.parent_support': { type: String, required: true },
  'academic_trayectory.emotional_affectations': {
    type: String,
    required: true,
  },
  'expectations.results': { type: String, required: true },
  'expectations.motive': { type: String, required: true },
  'expectations.impact': { type: String, required: true },
  'expectations.experience': { type: String, required: true },
  'expectations.cocurricular_activity': { type: String, required: true },
  'expectations.work': { type: String, required: true },
  'socialservicei.conversationengagement': { type: String, required: true },
  'socialservicei.conversationunderstanding': { type: String, required: true },
  'socialservicei.feelings': { type: String, required: true },
  'socialservicei.nousy': { type: String, required: true },
  'socialservicei.kept': { type: String, required: true },
  'socialservicei.empathic': { type: String, required: true },
  'socialservicei.ofensive': { type: String, required: true },
  'socialservicei.undestanding': { type: String, required: true },
  'socialservicei.insensitive': { type: String, required: true },
  'socialservicei.engagement': { type: String, required: true },
  'socialserviceii.sensitive': { type: String, required: true },
  'socialserviceii.responsable': { type: String, required: true },
  'socialserviceii.respectful': { type: String, required: true },
  'socialserviceii.promote': { type: String, required: true },
  'socialserviceiii.values': { type: String, required: true },
  'socialserviceiii.commited': { type: String, required: true },
  'socialserviceiii.people': { type: String, required: true },
  'socialserviceiii.ethics': { type: String, required: true },
  'socialserviceiii.enthusiastic': { type: String, required: true },
  'socialserviceiii.pesimistic': { type: String, required: true },
  'socialserviceiii.problomsolver': { type: String, required: true },
  'socialserviceiii.respectful': { type: String, required: true },
  'socialserviceiii.teamplayer': { type: String, required: true },
  'socialserviceiii.tasks': { type: String, required: true },
  schedule_comm: { type: String, required: true },
  schedule_math: { type: String, required: true },
  email: { type: String, required: true },
  email2: { type: String, required: true },
  personal_email: { type: String, required: true },
  password: { type: String, required: true },
  'agreement.authorize': { type: String, required: true },
  'agreement.contact': { type: String, required: true },
  'agreement.agreement': { type: String, required: true },
  'agreement.program': { type: String, required: true },
  'agreement.assistance': { type: String, required: true },
  'agreement.responsability': { type: String, required: true },
  'agreement.whatsapp': { type: String, required: true },
});

export const PersonaModel = mongoose.model('persona', PersonaSchema);
