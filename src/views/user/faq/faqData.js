import { v4 as uuid } from 'uuid';

const faqData = [
  {
    title: '1. What are mechs pods?',
    id: uuid(),
    body: (
      <div className="accordian_body">
        Mech pods contain the playable unit in the arenas. In order to power them up, they need to
        be fused with a Profile Picture (PFP).
      </div>
    )
  },
  {
    title: '2. What are G-mechs?',
    id: uuid(),
    body: (
      <div className="accordian_body">
        G-mechs are mech pods that have been fused with a Profile Picture (PFP). Players who own a
        mech pod and fuse it with a PFP are called Generals.
      </div>
    )
  },
  {
    title: '3. What are C-mechs?',
    id: uuid(),
    body: (
      <div className="accordian_body">
        C-mechs are hitchhiked versions of G-mechs. Players who use C-mechs are called Cadets.
      </div>
    )
  },
  {
    title: '4. Is this free to play?',
    id: uuid(),
    body: (
      <div className="accordian_body">
        With our General/Cadet system, F2P players can start playing by &apos;hitchhiking&apos;
        other mechs without ever needing to own one.
      </div>
    )
  },
  {
    title: '5. Why own a mech pod?',
    id: uuid(),
    body: (
      <div className="accordian_body">
        As an owner of a mech pod, you can fuse it with any PFP you own and earn more rewards as
        compared to a F2P player.
      </div>
    )
  }
];

export default faqData;
