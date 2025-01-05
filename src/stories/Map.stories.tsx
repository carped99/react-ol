import type { Meta, StoryObj } from '@storybook/react';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Map } from './Map';

import { setLevel } from 'ol/console';

setLevel('info');

const meta = {
  title: 'Example/MapView',
  component: Map,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    container: {
      style: { width: '100%', height: '500vh', border: '1px solid #ccc' },
    },
    view: {
      center: [128, 36],
      zoom: 8,
    },
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
  },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
