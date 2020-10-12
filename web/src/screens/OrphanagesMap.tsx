import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import mapMarker from '../assets/map-marker.svg';

import '../styles/screens/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

const OrphanagesMap = () => {
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita &#58;&#41;</p>
        </header>

        <footer>
          <strong>Itapetininga</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.591405,-48.0999839]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;