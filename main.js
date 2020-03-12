


(function (){ var issues = document.querySelectorAll('.opened-by')
  var totalIssues = [...issues].map(j => j.innerText.trim().replace(/\n/ig, '').split(' ')[0])
  // console.log(totalIssues)
  function fetchURLs() {
    {
      totalIssues.forEach(i => {
        var issueNumber = i.split('#').join('')
        
        var presentHref = window.location.href  
        var modifiedHref = window.location.href.includes("?q=is%3Aissue+is%3Aclosed") ? presentHref.split("?")[0] : presentHref
        fetch(modifiedHref + `/${issueNumber}`).then((response) => {
          return response.text()
        }).then(html => {
          var parser = new DOMParser();
          var doc2 = parser.parseFromString(html, 'text/html');
          var item = doc2.querySelectorAll('.js-issue-sidebar-form');
          let children = item[1].innerText
          let regexElem = children.replace(/ /g, '').trim().replace(/\r?\n|\r/g, " ").split('    ')
          let filtered = regexElem.filter(item => item.length > 0)
          filtered.shift()
          // console.log(filtered)
          var issue = document.getElementById(`issue_${issueNumber}_link`)
          // console.log(issueNumber)
          var p = document.createElement('p')
          // console.log(document.querySelector('.user-profile-link').innerText.split(' '))
          // console.log(modifiedHref.split('/')[3])
          document.querySelector('.user-profile-link').innerText.split(' ').pop().toLowerCase() == modifiedHref.split('/')[3] ? p.innerText = `${filtered.join(' ').split(' ')[2]}` : p.innerText = `${filtered.join(' ').split(' ')[1]}`
          p.style.background="#6FCA55"
          p.style.color = "#ffffff"
          p.style.border="1px solid grey"
          p.style.width = "100px"
          p.style.fontSize = "10px"
          p.style.borderRadius = "2px"
          p.style.textAlign =  "center";
          // p.classList.add('btn btn-primary')
          p.innerText=='Noneyet' ? '' : issue.append(p)
          
        })
      })
    }
  }
  fetchURLs()
})()
