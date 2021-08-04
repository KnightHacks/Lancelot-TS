import { Command } from '@knighthacks/dispatch';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { sendPaginatedEmbeds } from '../../util/paginator';

interface Cookie {
  name: string;
  description: string;
  image: string;
}

async function fetchCookiesData(): Promise<Cookie[]> {
  return (
    await axios.get(
      'https://jpswqfm3od.execute-api.us-east-1.amazonaws.com/default/crumbl-api'
    )
  ).data;
}

const crumbl: Command = {
  name: 'crumbl',
  description: 'View the current weekly specialty cookies at Crumbl Cookies!',
  async run({ interaction: i }) {
    await i.defer();
    const cookiesData = await fetchCookiesData();

    const embeds = cookiesData.map((c) => new MessageEmbed()
      .setTitle(c.name)
      .setDescription(c.description)
      .setThumbnail(c.image));

    await sendPaginatedEmbeds(i, embeds, {
      content: 'Here are the weekly specialty cookies!'
    });
  }
};

export default crumbl;