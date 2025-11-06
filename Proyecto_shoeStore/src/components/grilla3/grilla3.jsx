import {useState,useEffect}  from 'react';
import './grilla3.css'; 


const GrillaTres = () =>{
    return(
        <div className = "grid-tres">
            <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/6303179_FT_STATEMENT_SPORTY_N_RICH_ONSITE_SEPT_30_TC_2_X1_D_1440x960_CELTRA_af16eaad3b.jpg" alt="Imagen 1" className="grid-tres-item " />
            <img src="https://ar.puma.com/dw/image/v2/BKTG_PRD/on/demandware.static/-/Library-Sites-Shared/default/dw5582e18c/2025/25AW_Ecom_SP_Prime_Squid-Game_Homepage_Trending-Inline_Desk-Tab-Mob_1536x1536px.jpg?q=80" alt="Imagen 2" className="grid-tres-item " />
            <img src="https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/bf64cd62-573c-40db-bff4-e2e1b3e8788d___48eaa5dd73a4dae1130011fde87d6495.jpg" alt="Imagen 3" className="grid-tres-item " />
        </div>  
    );
}

export default GrillaTres;