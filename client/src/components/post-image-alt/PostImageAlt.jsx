import "./post-image-alt.css"
import { useEffect, useRef } from "react"

export default function PostImageAlt({closePostImageAlt, getElemOnOpaqueNode}) {

    const piaNode = useRef()

    useEffect(()=>{
        getElemOnOpaqueNode(piaNode.current)
    },[getElemOnOpaqueNode])

  return (
    <div className="pia-container" ref={piaNode}>
        <div className="pia-wrapper">
            <header className="pia-header">
                Image description
            </header>
            <p className="pia-alt-message">
            Monkeypox: How TF Does It Work?

            Inhalation
            Route: Live virus particles are inhaled
            Prevention: Wear a comfortable quality respirator that forms a tight seal on your face

            Direct Contact
            Route: Touching an infected person with your bare skin.
            Prevention: 
            Full PPE suit from head to toe including gloves, mask and goggles.
            Disinfect PPE before removing.

            Indirect Contact Through Touch
            Route: Touching an infected object that has been touched by an infectious person at anytime in the last 3-18 months.
            Prevention
            Gloves, Closed shoes, head covering, long sleeves, long pants
            Disinfect anything an infected person might have touched before you touch it.

            Indirect Contact Ingestion
            Route: Consuming something an infected person has touched.
            Clean all produce in an EPA approved disinfectant such as Electrolyzed Hypochlorous (HOCl) Water or Hydrogen Peroxide (H2O2).
            Cook all meats thoroughly
            Reheat food made by someone else to at least 200F/84C for 10 min

            Disinfect all packaging before openingMonkeypox: How TF Does It Work?

Inhalation
Route: Live virus particles are inhaled
Prevention: Wear a comfortable quality respirator that forms a tight seal on your face

Direct Contact
Route: Touching an infected person with your bare skin.
Prevention: 
Full PPE suit from head to toe including gloves, mask and goggles.
Disinfect PPE before removing.

Indirect Contact Through Touch
Route: Touching an infected object that has been touched by an infectious person at anytime in the last 3-18 months.
Prevention
Gloves, Closed shoes, head covering, long sleeves, long pants
Disinfect anything an infected person might have touched before you touch it.

Indirect Contact Ingestion
Route: Consuming something an infected person has touched.
Clean all produce in an EPA approved disinfectant such as Electrolyzed Hypochlorous (HOCl) Water or Hydrogen Peroxide (H2O2).
Cook all meats thoroughly
Reheat food made by someone else to at least 200F/84C for 10 min

Disinfect all packaging before openingMonkeypox: How TF Does It Work?

Inhalation
Route: Live virus particles are inhaled
Prevention: Wear a comfortable quality respirator that forms a tight seal on your face

Direct Contact
Route: Touching an infected person with your bare skin.
Prevention: 
Full PPE suit from head to toe including gloves, mask and goggles.
Disinfect PPE before removing.

Indirect Contact Through Touch
Route: Touching an infected object that has been touched by an infectious person at anytime in the last 3-18 months.
Prevention
Gloves, Closed shoes, head covering, long sleeves, long pants
Disinfect anything an infected person might have touched before you touch it.

Indirect Contact Ingestion
Route: Consuming something an infected person has touched.
Clean all produce in an EPA approved disinfectant such as Electrolyzed Hypochlorous (HOCl) Water or Hydrogen Peroxide (H2O2).
Cook all meats thoroughly
Reheat food made by someone else to at least 200F/84C for 10 min

Disinfect all packaging before openingMonkeypox: How TF Does It Work?

Inhalation
Route: Live virus particles are inhaled
Prevention: Wear a comfortable quality respirator that forms a tight seal on your face

Direct Contact
Route: Touching an infected person with your bare skin.
Prevention: 
Full PPE suit from head to toe including gloves, mask and goggles.
Disinfect PPE before removing.

Indirect Contact Through Touch
Route: Touching an infected object that has been touched by an infectious person at anytime in the last 3-18 months.
Prevention
Gloves, Closed shoes, head covering, long sleeves, long pants
Disinfect anything an infected person might have touched before you touch it.

Indirect Contact Ingestion
Route: Consuming something an infected person has touched.
Clean all produce in an EPA approved disinfectant such as Electrolyzed Hypochlorous (HOCl) Water or Hydrogen Peroxide (H2O2).
Cook all meats thoroughly
Reheat food made by someone else to at least 200F/84C for 10 min

Disinfect all packaging before opening
            </p>
            <button className="pia-dismiss" onClick={closePostImageAlt}>
                Dismiss
            </button>
        </div>
    </div>
  )
}
