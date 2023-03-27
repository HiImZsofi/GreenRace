export interface Profpics {
    path: string;
    name: string;
    unlock: boolean;
}

const Profilepictures: Profpics[] = [
  {path: "npic.png", name: "semleges", unlock: true},
  {path: "profpic_male.jpg", name: "hím", unlock: true},
  {path: "profpic_female.jpg", name: "nőstény", unlock: true},
  {path: "golden.png", name: "traktor", unlock: false},
];

export default Profilepictures;