type Dj = {
  _id?: string,
  name: string,
  image: string | ArrayBuffer | null
  socials?: {
    platform: string;
    url: string;
  }[];
};

type DjDisplay = Omit<Dj, 'image'> & {
  image: {
    public_id: string,
    url: string,
  }
};

type SelectedDj = {
  _id: string,
  name: string,
};
type SelectedEvent = SelectedDj;

type EventDj = {
  _id: string
};

type Socials = {
  _id?:string,
  platform: string,
  url: string,
};

type EventImg = {
  public_id: string,
  url: string,
  _id?: string,

};

type MainEvent = {
  _id?: string
  name: string,
  bio: string,
  date: string,
  location: string,
  locationLink: string,
  ticketLink: string,
  image: string | ArrayBuffer | null | EventImg,
  isActive: boolean,
  locationMapLink?: string,
  djs: Dj[] | never[]
};

type EventToShow = Omit<MainEvent, 'image', 'djs' > & {
  image: EventImg,
  djs: EventDj[]
};

type NewEvent = Omit<MainEvent, 'djs', "bio'"> & {
  djs: EventDj[]
  bio?: string,
};

type UpdateEvent = Omit<NewEvent, 'image'> & {
  image?: '' | {
    public_id: string,
    url: string
  }
};

type EventDisplay = {
  _id: string
  name: string,
  date: string,
  location: string,
  locationLink: string,
  ticketLink: string,
  djs?: SelectedDj[]
};

type AllEvents = {
  newEvents: EventDisplay[],
  oldEvents: EventDisplay[]
};
