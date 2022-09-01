describe( 'Source: SGGS', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/1/page/1/line/0' )
    cy.contains( '<> siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gur pRswid ]' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Prof. Sahib Singh' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'jpu' ) )

  it( 'Go back home', () => cy.goToSourceView( 'jpu' ) )
} )

describe( 'Source: Sri Dasam Granth', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/2/page/1/line/0' )
    cy.contains( 'jwiq Aru pwiq nihn ijh ]' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Dr. Rattan Singh Jaggi' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'ByK' ) )

  it( 'Go back home', () => cy.goToSourceView( 'iqRBvx mhIp sur nr Asur nyq nyq bn iqRx khq ]' ) )
} )

describe( 'Source: Vaaran', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/3/page/1/line/0' )
    cy.contains( 'ipRQmY swis n mws sin AMD DuMD kCu Kbir n pweI [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Bhai Vir Singh' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'ibMd' ) )

  it( 'Go back home', () => cy.goToSourceView( 'rkiq ibMd kI dyih ric pMic qq kI jiVq jVweI [' ) )
} )

describe( 'Source: Kabit Swaiye', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/4/page/1/line/0' )
    cy.contains( 'Enm sRI siqgur crn Awid purK Awdysu [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Sant Sampuran Singh' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'ibbyk' ) )

  it( 'Go back home', () => cy.goToSourceView( 'eyk Anyk ibbyk sis Gt Gt kw prvys [2[1[' ) )
} )

describe( 'Source: Gazlaan', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/5/page/1/line/0' )
    cy.contains( 'hvwie bMdgI Awvurd dr vjUd mrw [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Dr. Ganda Singh' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'vgrnw' ) )

  it( 'Go back home', () => cy.goToSourceView( 'hr AwN ksy ikh bU-sUie qU rih nmUd mrw [4[' ) )
} )

describe( 'Source: Zindagi Nama', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/6/page/1/line/0' )
    cy.contains( 'eIx qnq Abrysq dr vY AwPqwb [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Dr. Ganda Singh' ) )

  it( 'Go back home', () => cy.goToSourceView( 'h¤k pRsqwx ^ud-pRsqI cUM kunMd [' ) )
} )

describe( 'Source: Ganj Nama', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/7/page/1/line/0' )
    cy.contains( 'vwihgurU jIE hwzr nwzr hY [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Pritpal Singh Bindra' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'jwnm' ) )

  it( 'Go back home', () => cy.goToSourceView( 'br A&rwzd iz Xk idgr subhW [21[' ) )
} )

describe( 'Source: Jot Bigas', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/8/page/1/line/0' )
    cy.contains( 'joiq ibgws [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'Pritpal Singh Bindra' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'siqgur' ) )

  it( 'Go back home', () => cy.goToSourceView( 'hzwrW cUM rusqm hzwrW cUM swm [' ) )
} )

describe( 'Source: Ardaas', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/9/page/1/line/0' )
    cy.contains( 'dsW pwiqSwhIAW dI joq sRI gurU gRMQ swihb jI dy pwT dIdwr dw iDAwn Dr ky bolo jI vwihgurU [' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'SGPC' ) )

  it( 'Go back home', () => cy.goToSourceView( 'is`KW dw mn nIvW mq au~cI mq dw rwKw Awip vwihgurU [' ) )
} )

describe( 'Source: Sarabloh Granth', () => {
  it( 'Open Source Page', () => {
    cy.visit( '/sources/11/page/1/line/0' )
    cy.contains( 'kwl purK kI AwigAw pwie pRgt BXo rUp muinvr ko ]' ).click()
  } )

  it( 'Open Line Viewer', () => cy.goToLineViewer( 'W. H. McLeod' ) )

  it( 'Go to Next Line', () => cy.goToNextLine( 'dÍY' ) )

  it( 'Go back home', () => cy.goToSourceView( 'imtI dÍYq su jgq aupwiDn Asur mlyCn mUl gey ]' ) )
} )
