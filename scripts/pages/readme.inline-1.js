(function(){
  const bodyEl = document.getElementById('readmeBody');
  const tocEl = document.getElementById('readmeToc');
  const sourceEl = document.getElementById('readmeSource');
  const fallbackEl = document.getElementById('readmeFallback');

  if(!bodyEl) return;

  const fallbackText = String(fallbackEl?.textContent || '').replace(/^\n+|\n+$/g, '');

  function escapeHtml(value){
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderInline(value){
    return escapeHtml(value)
      .replace(/\\\./g, '.')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  function slugify(value, seen){
    const base = String(value || 'section')
      .replace(/`/g, '')
      .replace(/[^0-9A-Za-z\u00C0-\u024F\u0400-\u04FF\u3040-\u30FF\u3400-\u9FFF\uAC00-\uD7AF\s-]/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() || 'section';
    let slug = base;
    let count = 1;
    while(seen.has(slug)){
      count += 1;
      slug = `${base}-${count}`;
    }
    seen.add(slug);
    return slug;
  }

  function isTableDivider(line){
    return /^\|\s*[:\-| ]+\|\s*$/.test(line);
  }

  function parseTableLines(lines){
    const rows = lines.map(line=>line.trim().replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim()));
    const hasDivider = rows.length > 1 && isTableDivider(lines[1].trim());
    const head = rows[0] || [];
    const body = hasDivider ? rows.slice(2) : rows.slice(1);
    return {
      head,
      body
    };
  }

  function renderMarkdown(source){
    const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
    const html = [];
    const toc = [];
    const seenSlugs = new Set();
    let paragraph = [];
    let list = [];

    function flushParagraph(){
      if(!paragraph.length) return;
      html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }

    function flushList(){
      if(!list.length) return;
      html.push('<ul>');
      list.forEach(item=>html.push(`<li>${renderInline(item)}</li>`));
      html.push('</ul>');
      list = [];
    }

    function flushAll(){
      flushParagraph();
      flushList();
    }

    for(let i=0;i<lines.length;i++){
      const raw = lines[i];
      const line = raw.trimEnd();
      const trimmed = line.trim();

      if(!trimmed){
        flushAll();
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
      if(headingMatch){
        flushAll();
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = slugify(text, seenSlugs);
        html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
        toc.push({ level, text: text.replace(/`/g, ''), id });
        continue;
      }

      if(trimmed.startsWith('|')){
        flushAll();
        const tableLines = [trimmed];
        while(i + 1 < lines.length && lines[i + 1].trim().startsWith('|')){
          i += 1;
          tableLines.push(lines[i].trim());
        }
        const table = parseTableLines(tableLines);
        if(table.head.length){
          html.push('<div class="table-wrap"><table><thead><tr>');
          table.head.forEach(cell=>html.push(`<th>${renderInline(cell)}</th>`));
          html.push('</tr></thead><tbody>');
          table.body.forEach(row=>{
            html.push('<tr>');
            row.forEach(cell=>html.push(`<td>${renderInline(cell)}</td>`));
            html.push('</tr>');
          });
          html.push('</tbody></table></div>');
        }
        continue;
      }

      const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
      if(listMatch){
        flushParagraph();
        list.push(listMatch[1].trim());
        continue;
      }

      const fenceMatch = trimmed.match(/^```/);
      if(fenceMatch){
        flushAll();
        const codeLines = [];
        while(i + 1 < lines.length){
          i += 1;
          if(lines[i].trim().match(/^```/)) break;
          codeLines.push(lines[i]);
        }
        html.push(`<pre>${escapeHtml(codeLines.join('\n'))}</pre>`);
        continue;
      }

      if(list.length){
        flushList();
      }
      paragraph.push(trimmed);
    }

    flushAll();
    bodyEl.innerHTML = html.join('');
    if(tocEl){
      tocEl.innerHTML = toc.map(entry=>`<a class="toc-h${entry.level}" href="#${entry.id}">${escapeHtml(entry.text)}</a>`).join('');
    }
  }

  async function load(){
    let text = fallbackText;
    let sourceLabel = 'embedded copy';
    try{
      const response = await fetch('./README.md', { cache:'no-store' });
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      text = await response.text();
      sourceLabel = 'README.md live';
    }catch(_error){}
    renderMarkdown(text);
    if(sourceEl) sourceEl.textContent = sourceLabel;
  }

  load();
})();
