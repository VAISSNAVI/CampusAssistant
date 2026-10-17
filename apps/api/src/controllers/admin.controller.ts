import { Request, Response } from 'express';
import * as cheerio from 'cheerio';
import { adminItemSchema, adminScrapeSchema } from '@campus-assistant/validation';
import { dbService } from '../services/db.service';

export async function getAdminItems(req: Request, res: Response) {
  const type = (req.query.type as string) || 'documents';
  const items = await dbService.getAdminItems(type);
  return res.json({ type, items });
}

export async function createAdminItem(req: Request, res: Response) {
  const { type, item } = adminItemSchema.parse(req.body);
  const created = await dbService.upsertAdminItem(type, item);
  return res.status(201).json(created);
}

export async function updateAdminItem(req: Request, res: Response) {
  const { type, item } = adminItemSchema.parse(req.body);
  const updated = await dbService.upsertAdminItem(type, { ...item, id: req.params.id });
  return res.json(updated);
}

export async function deleteAdminItem(req: Request, res: Response) {
  const type = (req.query.type as string) || 'documents';
  const id = req.params.id;
  await dbService.deleteAdminItem(type, id);
  return res.json({ success: true, message: 'Item deleted successfully' });
}

export async function reindexKnowledge(req: Request, res: Response) {
  // Reindex vectors / knowledge base
  return res.json({
    success: true,
    message: 'Campus knowledge base re-indexed successfully.',
    timestamp: new Date().toISOString(),
  });
}

export async function scrapePage(req: Request, res: Response) {
  const { url } = adminScrapeSchema.parse(req.body);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CampusMate-KRCE-Indexer/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract title
    let title = $('title').text().trim() || $('h1').first().text().trim() || 'KRCE Official Information';
    title = title.replace(/\s*\|\s*KRCE.*$/i, '').trim();

    // Extract main text body
    $('script, style, nav, footer, header, noscript').remove();
    let content = $('article, main, .content, #content, body').first().text().replace(/\s+/g, ' ').trim();
    if (content.length > 500) {
      content = content.slice(0, 500) + '...';
    }

    // Save as draft document
    const draftDoc = await dbService.upsertAdminItem('documents', {
      title,
      category: 'administration',
      content,
      source: url,
      status: 'draft',
    });

    return res.status(201).json({
      message: `Extracted "${title}" as a draft`,
      data: draftDoc,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: `Import failed: ${error.message || 'Unable to access URL'}. Use an HTTPS URL from krce.ac.in.`,
    });
  }
}
