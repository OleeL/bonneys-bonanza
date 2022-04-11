import WizardD from "./Wizard1.png";
import WizardR from "./Wizard2.png";
import WizardRAlt from "./Wizard3.png";
import WizardL from "./Wizard4.png";
import WizardLAlt from "./Wizard5.png";
import WizardRa from "./Wizard6.png";
import WizardLa from "./Wizard7.png";
import Projectile from "./Wizard8.png";
import WizardDead1 from "./Wizard9.png";
import WizardDead2 from "./Wizard10.png";
import WizardDead3 from "./Wizard11.png";
import WizardDead4 from "./Wizard12.png";
import WizardUp from "./Wizard13.png";

interface IWizard {
    [key: string]: string
}

const Wizard: IWizard = {
    "Down": WizardD,
    "Right": WizardR,
    "RightAlt": WizardRAlt,
    "Left": WizardL,
    "LeftAlt": WizardLAlt,
    "RightAttack": WizardRa,
    "LeftAttack": WizardLa,
    "Projectile": Projectile,
    "Dead1": WizardDead1,
    "Dead2": WizardDead2,
    "Dead3": WizardDead3,
    "Dead4": WizardDead4,
    "Up": WizardUp
}

export default Wizard;