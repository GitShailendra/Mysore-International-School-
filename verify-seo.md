# SEO Verification Checklist
## Test Your Implementation

Use this checklist to verify all SEO features are working correctly after deployment.

---

## 🔍 Manual Testing

### 1. Sitemap Test
- [ ] Visit: `https://yourdomain.com/sitemap.xml`
- [ ] Should see XML with all page URLs
- [ ] Check last modified dates are recent
- [ ] Verify priority values (homepage = 1.0)

### 2. Robots.txt Test
- [ ] Visit: `https://yourdomain.com/robots.txt`
- [ ] Should see "User-agent: *"
- [ ] Should see "Allow: /"
- [ ] Should see "Disallow: /admin/"
- [ ] Should see sitemap reference

### 3. Homepage Meta Tags
- [ ] Right-click → View Page Source
- [ ] Find `<title>` tag with "Best School in Mysore"
- [ ] Find meta description with keywords
- [ ] Find Open Graph tags (og:title, og:description, og:image)
- [ ] Find Twitter Card tags
- [ ] Find canonical link

### 4. Structured Data Test
- [ ] View page source
- [ ] Find `<script type="application/ld+json">`
- [ ] Should see Organization schema
- [ ] Should see Website schema
- [ ] On homepage: Should see FAQ schema

### 5. FAQ Section
- [ ] Scroll to FAQ section on homepage
- [ ] Click to expand questions
- [ ] Verify 10 questions are present
- [ ] Check answers are comprehensive

### 6. Mobile Test
- [ ] Open site on mobile device
- [ ] Check responsive design
- [ ] Test navigation
- [ ] Verify FAQ section works
- [ ] Check page load speed

---

## 🛠️ Automated Testing Tools

### Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter your homepage URL
3. Click "Test URL"
4. Should show:
   - ✅ Organization
   - ✅ Website
   - ✅ FAQPage
5. No errors should appear

### Google Mobile-Friendly Test
1. Go to: https://search.google.com/test/mobile-friendly
2. Enter your URL
3. Should show "Page is mobile-friendly"

### PageSpeed Insights
1. Go to: https://pagespeed.web.dev
2. Enter your URL
3. Target scores:
   - Performance: 80+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 95+

### Schema Markup Validator
1. Go to: https://validator.schema.org
2. Enter your homepage URL
3. Should validate without errors
4. Check all schemas are detected

---

## 📊 Google Search Console Verification

### After Adding Property:
- [ ] Property verified successfully
- [ ] Sitemap submitted
- [ ] Sitemap status: "Success"
- [ ] Pages discovered
- [ ] No coverage errors
- [ ] Mobile usability: No issues

### Check These Reports:
1. **Performance** - Track impressions & clicks
2. **Coverage** - Ensure all pages indexed
3. **Sitemaps** - Verify submission successful
4. **Mobile Usability** - No mobile issues
5. **Core Web Vitals** - Good URLs percentage

---

## 🎯 Keyword Verification

### Search These Phrases (Incognito Mode):
1. "Mysore International School"
   - [ ] Your site appears in results
2. "best school in Mysore"
   - [ ] Track position (may take time)
3. "international school Mysore"
   - [ ] Track position
4. "CBSE school Mysore"
   - [ ] Track position

### Google Business Profile:
- [ ] Search "Mysore International School"
- [ ] Business profile appears on right
- [ ] Correct information displayed
- [ ] Photos visible
- [ ] Reviews section active

---

## 🔗 Link Verification

### Internal Links:
- [ ] All navigation links work
- [ ] Footer links functional
- [ ] Breadcrumbs display correctly
- [ ] No broken links (use tool below)

### External Links:
- [ ] Social media links work
- [ ] Open in new tab
- [ ] Point to correct profiles

### Broken Link Checker:
Use: https://www.deadlinkchecker.com
- [ ] Enter your domain
- [ ] Run check
- [ ] Fix any broken links found

---

## 📱 Social Media Sharing Test

### Facebook Debugger:
1. Go to: https://developers.facebook.com/tools/debug
2. Enter your homepage URL
3. Click "Scrape Again"
4. Verify:
   - [ ] Correct title shows
   - [ ] Description appears
   - [ ] Image displays
   - [ ] No errors

### Twitter Card Validator:
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Verify:
   - [ ] Card preview shows
   - [ ] Title correct
   - [ ] Description correct
   - [ ] Image displays

### LinkedIn Post Inspector:
1. Go to: https://www.linkedin.com/post-inspector
2. Enter your URL
3. Verify preview looks good

---

## 🎨 Visual Verification

### Homepage Checklist:
- [ ] Hero section loads properly
- [ ] FAQ section visible
- [ ] All images load
- [ ] No layout shifts
- [ ] Smooth scrolling
- [ ] Call-to-action buttons work

### All Pages:
- [ ] Unique title in browser tab
- [ ] Breadcrumbs show (if implemented)
- [ ] Footer displays correctly
- [ ] Contact information accurate
- [ ] Forms work properly

---

## 📈 Analytics Verification

### Google Analytics 4:
- [ ] Tracking code installed
- [ ] Real-time data showing
- [ ] Page views tracked
- [ ] Events configured
- [ ] Conversions set up

### Test Tracking:
1. Visit your site
2. Navigate to different pages
3. Check GA4 real-time report
4. Should see your activity

---

## 🚨 Common Issues & Fixes

### Issue: Sitemap not found
**Fix**: Rebuild the project, check `/src/app/sitemap.ts` exists

### Issue: Structured data errors
**Fix**: Validate JSON-LD syntax in `/src/lib/seo-config.ts`

### Issue: Pages not indexed
**Fix**: Submit sitemap in Search Console, request indexing

### Issue: Meta tags not showing
**Fix**: Clear cache, check page source, verify metadata exports

### Issue: Mobile issues
**Fix**: Test responsive design, check viewport meta tag

---

## ✅ Final Verification Checklist

### Technical SEO:
- [ ] Sitemap accessible and valid
- [ ] Robots.txt configured correctly
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Canonical URLs on all pages
- [ ] No duplicate content
- [ ] 404 page exists
- [ ] SSL certificate active (HTTPS)

### On-Page SEO:
- [ ] H1 tags on all pages
- [ ] Proper heading hierarchy (H1→H2→H3)
- [ ] Images have alt text
- [ ] Internal linking implemented
- [ ] Content includes target keywords
- [ ] URLs are SEO-friendly

### Structured Data:
- [ ] Organization schema present
- [ ] Website schema present
- [ ] FAQ schema on homepage
- [ ] No schema errors
- [ ] Validates in testing tools

### Local SEO:
- [ ] Google Business Profile created
- [ ] NAP consistent everywhere
- [ ] Local keywords in content
- [ ] Contact page optimized
- [ ] Location in footer

### Social Media:
- [ ] Open Graph tags working
- [ ] Twitter Cards working
- [ ] Social links updated
- [ ] Sharing previews look good

### Performance:
- [ ] Page load under 3 seconds
- [ ] Mobile-friendly
- [ ] No console errors
- [ ] Images optimized
- [ ] Core Web Vitals good

---

## 📊 Success Metrics to Track

### Week 1:
- [ ] Website indexed by Google
- [ ] Sitemap processed
- [ ] No critical errors

### Month 1:
- [ ] 50+ pages indexed
- [ ] Ranking for brand name
- [ ] 100+ organic visitors
- [ ] 10+ keywords tracked

### Month 3:
- [ ] 500+ organic visitors
- [ ] 20+ keywords ranking
- [ ] 5+ top 10 positions
- [ ] 25+ Google Business reviews

### Month 6:
- [ ] 1,500+ organic visitors
- [ ] 50+ keywords ranking
- [ ] 15+ top 10 positions
- [ ] Top 5 for main keyword
- [ ] 50+ Google Business reviews

---

## 🎯 Priority Actions

### Do First (Today):
1. [ ] Test sitemap.xml
2. [ ] Test robots.txt
3. [ ] Verify structured data
4. [ ] Check mobile responsiveness
5. [ ] Test all forms

### Do This Week:
1. [ ] Google Search Console setup
2. [ ] Submit sitemap
3. [ ] Google Business Profile
4. [ ] Google Analytics setup
5. [ ] Request indexing for key pages

### Do This Month:
1. [ ] Monitor rankings
2. [ ] Create first blog post
3. [ ] Build 5 backlinks
4. [ ] Get 10 reviews
5. [ ] Update social media

---

## 📞 Need Help?

If you find issues:
1. Check `SEO_IMPLEMENTATION_GUIDE.md` for detailed solutions
2. Use `QUICK_SEO_REFERENCE.md` for quick fixes
3. Test with online tools listed above
4. Clear browser cache and test again

---

**Verification Date**: _____________
**Verified By**: _____________
**Status**: [ ] All Passed  [ ] Issues Found  [ ] In Progress

---

Good luck with your SEO! 🚀
