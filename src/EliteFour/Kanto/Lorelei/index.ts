import articuno from './articuno.json'
import bronzong from './bronzong.json'
import chansey from './chansey.json'
import claydol from './claydol.json'
import dragonite from './dragonite.json'
import exeggutor from './exeggutor.json'
import golduck from './golduck.json'
import hariyama from './hariyama.json'
import jynx from './jynx.json'
import lapras from './lapras.json'
import lucario from './lucario.json'
import magnezone from './magnezone.json'
import mantine from './mantine.json'
import nidoking from './nidoking.json'
import nidoqueen from './nidoqueen.json'
import raichu from './raichu.json'
import slowbro from './slowbro.json'
import togekiss from './togekiss.json'
import vileplume from './vileplume.json'

import { Leads } from '~/utilities/datatypes'

export function leads(): Leads[] {
    return [articuno, bronzong, chansey, claydol, dragonite, exeggutor, golduck, hariyama, jynx, lapras, lucario, magnezone, mantine, nidoking, nidoqueen, raichu, slowbro, togekiss, vileplume]
}
