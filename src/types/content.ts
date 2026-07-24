export type LinkItem = {
  label: string;
  url: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

export type SiteContent = {
  title: string;
  subtitle: string;
  welcome: string;
  mission: string;
  vision: string;
  values: string[];
  tcuTitle: string;
  tcuDescription: string;
  contact: ContactInfo;
};

export type DocumentItem = {
  title: string;
  year?: string;
  file: string;
};

export type DocumentContent = {
  estatuto: DocumentItem;
  actaConstitutiva: DocumentItem;
  planTrabajo: DocumentItem[];
};

export type ActaItem = {
  title: string;
  date?: string;
  file: string;
};

export type ActaYear = {
  year: string;
  items: ActaItem[];
};

export type ActasContent = {
  juntaDirectiva: ActaYear[];
  asambleaGeneral: ActaYear[];
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  image: string;
};

export type GalleryItem = {
  title: string;
  image: string;
};

export type CalendarEvent = {
  title: string;
  date: string;
  time?: string;
  place?: string;
  description?: string;
};

export type ListContent<T> = {
  items: T[];
};
