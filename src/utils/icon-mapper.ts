import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faAppleWhole,
  faBullseye,
  faCreditCard,
  faPiggyBank,
  faQuestionCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

const ICON_MAP: Record<string, IconDefinition> = {
  apple: faAppleWhole,
  'piggy-bank': faPiggyBank,
  'shopping-cart': faShoppingCart,
  bullseye: faBullseye,
}

export const getIconComponent = (iconName: string): IconDefinition => {
  return ICON_MAP[iconName] ?? faCreditCard ?? faQuestionCircle
}

