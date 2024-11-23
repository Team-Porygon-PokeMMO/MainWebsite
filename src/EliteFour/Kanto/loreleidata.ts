import { leads } from './Lorelei'
import { Trainer } from '~/utilities/datatypes'

export const lorelei: Trainer = {
    Name: "Lorelei",
    Image: "/images/lorelei.png",
    ImagePosition: "25% 30%",
    IsVisible: false,
    Leads: leads()
} 