// src/components/CoinIdentifier.jsx
import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { Coins as CoinIcon, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
// If you did NOT import theme.css globally in src/index.js, keep the next line.
// Otherwise, you may remove it.
// import '../theme.css';

// ---------- Coin catalog ----------
const coinList = [
    {
        id: 1,
        name: 'Lincoln Wheat Cent',
        year: 1943,
        mintMark: 'D',
        defaultImages: { front: '/images/lincoln_wheat_obv.jpg', back: '/images/lincoln_wheat_rev.jpg' },
        description:
            'During WWII, the 1943 Lincoln Wheat Cent was struck in zinc-coated steel due to copper shortages. Its unique silver-gray color and wartime history make it a standout piece for collectors.',
        facts: [
            'Composition: steel core with zinc plating.',
            'Diameter: 19.05 mm; Weight: 2.70 g.',
            'Obverse: Abraham Lincoln; Reverse: wheat ears.',
            'Error variety (1943 bronze cent) is extremely rare.',
        ],
        values: {
            'Poor (P-1)': 0.1, 'Fair (FR-2)': 0.15, 'AG-3': 0.2, 'G-4': 0.25, 'VG-8': 0.5,
            'F-12': 1.0, 'VF-20': 2.0, 'EF-40': 5.0, 'AU-50': 10.0, 'MS-60+': 20.0
        },
    },
    {
        id: 2,
        name: 'Morgan Silver Dollar',
        year: 1884,
        mintMark: 'S',
        defaultImages: { front: '/images/morgan_obv.jpg', back: '/images/morgan_rev.jpg' },
        description:
            'Designed by George T. Morgan, this classic silver dollar features Liberty on the obverse and an eagle on the reverse.',
        facts: [
            'Weight: 26.73 g; Composition: 90% silver (≈0.7734 troy oz), 10% copper.',
            'Diameter: 38.1 mm.',
            'Mintage range: 1878–1904, 1921.',
            'Highly collectible for design and silver content.',
        ],
        values: {
            'P-1': 30, 'FR-2': 35, 'AG-3': 40, 'G-4': 45, 'VG-8': 50,
            'F-12': 55, 'VF-20': 65, 'EF-40': 80, 'AU-50': 120, 'MS-60+': 200
        },
    },
    {
        id: 3,
        name: 'Roosevelt Dime',
        year: 1965,
        mintMark: '',
        defaultImages: { front: '/images/roosevelt_dime_obv.jpg', back: '/images/roosevelt_dime_rev.jpg' },
        description:
            'First struck in 1946 to honor FDR, this dime switched to a copper-nickel clad composition in 1965 after silver was removed.',
        facts: [
            'Diameter: 17.91 mm; Weight: 2.27 g.',
            'Obverse: Roosevelt; Reverse: torch flanked by olive & oak branches.',
            'Edge: reeded.',
            'Post-1964 composition: copper core with cupronickel cladding.',
        ],
        values: {
            'P-1': 0.10, 'FR-2': 0.15, 'AG-3': 0.30, 'G-4': 0.50, 'VG-8': 1.0,
            'F-12': 2.0, 'VF-20': 5.0, 'EF-40': 10.0, 'AU-50': 15.0, 'MS-60+': 25.0
        },
    },
    {
        id: 4,
        name: 'Jefferson Nickel',
        year: 1950,
        mintMark: 'D',
        defaultImages: { front: '/images/jefferson_nickel_obv.jpg', back: '/images/jefferson_nickel_rev.jpg' },
        description:
            'Introduced in 1938; Jefferson on the obverse and Monticello on the reverse. Standard alloy is 75% copper / 25% nickel.',
        facts: [
            'Diameter: 21.21 mm; Weight: 5.00 g.',
            'Obverse: Jefferson; Reverse: Monticello.',
            'Wartime silver alloy variety minted 1942–1945.',
            '1950-D is a popular semi-key date for the series.',
        ],
        values: {
            'P-1': 0.10, 'FR-2': 0.20, 'AG-3': 0.50, 'G-4': 1.0, 'VG-8': 2.0,
            'F-12': 3.0, 'VF-20': 5.0, 'EF-40': 8.0, 'AU-50': 12.0, 'MS-60+': 20.0
        },
    },
    {
        id: 5,
        name: 'Washington Bicentennial Quarter',
        year: 1976,
        mintMark: 'S',
        defaultImages: { front: '/images/washington_quarter_obv.jpg', back: '/images/washington_quarter_rev.jpg' },
        description:
            'Commemorates the 200th anniversary of U.S. independence; Washington obverse with a colonial drummer reverse.',
        facts: [
            'Diameter: 24.3 mm; Weight: 5.67 g.',
            'Composition: copper-nickel clad (some special strikes in 40% silver).',
            'Issued only in 1975–1976 with dual date 1776–1976.',
            'Reverse drummer design by Jack L. Ahr.',
        ],
        values: {
            'P-1': 0.25, 'FR-2': 0.50, 'AG-3': 1.0, 'G-4': 2.0, 'VG-8': 3.0,
            'F-12': 4.0, 'VF-20': 5.0, 'EF-40': 8.0, 'AU-50': 15.0, 'MS-60+': 30.0
        },
    },
    {
        id: 6,
        name: 'Kennedy Half Dollar',
        year: 1964,
        mintMark: 'D',
        defaultImages: { front: '/images/kennedy_half_obv.jpg', back: '/images/kennedy_half_rev.jpg' },
        description:
            'Memorial issue after President Kennedy’s assassination. The 1964 issue is 90% silver.',
        facts: [
            'Diameter: 30.6 mm; Weight: 12.5 g.',
            'Obverse: Kennedy; Reverse: Presidential Seal.',
            'Silver content reduced to 40% for 1965–1970; clad afterward.',
            'First issue released in 1964.',
        ],
        values: {
            'P-1': 4.0, 'FR-2': 5.0, 'AG-3': 6.0, 'G-4': 7.0, 'VG-8': 8.0,
            'F-12': 9.0, 'VF-20': 10.0, 'EF-40': 12.0, 'AU-50': 15.0, 'MS-60+': 25.0
        },
    },
    {
        id: 7,
        name: 'Peace Dollar',
        year: 1922,
        mintMark: '', // Philadelphia coins of this era have no mint mark
        defaultImages: { front: '/images/peace_dollar_obv.jpg', back: '/images/peace_dollar_rev.jpg' },
        description:
            'Issued to commemorate peace after WWI; Liberty on the obverse and a perched eagle with olive branch on the reverse.',
        facts: [
            'Composition: 90% silver, 10% copper.',
            'Diameter: 38.1 mm; Weight: 26.73 g (≈0.7734 troy oz silver).',
            'Designer: Anthony de Francisci.',
            'Minted 1921–1928 and 1934–1935.',
        ],
        values: {
            'P-1': 30, 'FR-2': 35, 'AG-3': 40, 'G-4': 45, 'VG-8': 50,
            'F-12': 60, 'VF-20': 75, 'EF-40': 100, 'AU-50': 150, 'MS-60+': 250
        },
    },
    {
        id: 8,
        name: 'Standing Liberty Quarter',
        year: 1918,
        mintMark: 'S',
        defaultImages: { front: '/images/standing_liberty_obv.jpg', back: '/images/standing_liberty_rev.jpg' },
        description:
            'Liberty striding forward on the obverse and an eagle in flight on the reverse, by Hermon A. MacNeil.',
        facts: [
            'Composition: 90% silver, 10% copper.',
            'Diameter: 24.3 mm; Weight: 6.25 g.',
            'Series minted 1916–1930.',
            'Two main design types: Type I (bare breast), Type II (clothed).',
        ],
        values: {
            'P-1': 20, 'FR-2': 25, 'AG-3': 30, 'G-4': 35, 'VG-8': 40,
            'F-12': 45, 'VF-20': 55, 'EF-40': 70, 'AU-50': 90, 'MS-60+': 130
        },
    },
    {
        id: 9,
        name: 'Barber Dime',
        year: 1901,
        mintMark: 'O',
        defaultImages: { front: '/images/barber_dime_obv.jpg', back: '/images/barber_dime_rev.jpg' },
        description:
            'Part of the Barber coinage by Charles E. Barber; Liberty head obverse and wreath reverse.',
        facts: [
            'Composition: 90% silver, 10% copper.',
            'Diameter: 17.9 mm; Weight: 2.5 g.',
            'Minted 1892–1916.',
            'Also known as the “Liberty Head” dime.',
        ],
        values: {
            'P-1': 3, 'FR-2': 4, 'AG-3': 5, 'G-4': 6, 'VG-8': 7,
            'F-12': 8, 'VF-20': 9, 'EF-40': 12, 'AU-50': 15, 'MS-60+': 20
        },
    },
    {
        id: 10,
        name: 'Indian Head Penny',
        year: 1909,
        mintMark: '',
        defaultImages: { front: '/images/indian_head_obv.jpg', back: '/images/indian_head_rev.jpg' },
        description:
            'Designed by James B. Longacre; Liberty wearing a Native American headdress on the obverse and a wreath reverse.',
        facts: [
            'Composition: 95% copper, 5% tin & zinc.',
            'Diameter: 19.05 mm; Weight: 3.11 g.',
            'Series minted 1859–1909.',
            '1909 issues feature designer’s initials on the ribbon.',
        ],
        values: {
            'P-1': 1, 'FR-2': 2, 'AG-3': 3, 'G-4': 4, 'VG-8': 5,
            'F-12': 7, 'VF-20': 10, 'EF-40': 20, 'AU-50': 25, 'MS-60+': 50
        },
    },
];

// ---------- Component ----------
export default function CoinIdentifier() {
    const [selected, setSelected] = useState(null);
    const [condition, setCondition] = useState('');
    const [uploadedFront, setUploadedFront] = useState(null);
    const [uploadedBack, setUploadedBack] = useState(null);

    const handleCoinChange = (e) => {
        const id = parseInt(e.target.value, 10);
        const coin = coinList.find((c) => c.id === id) || null;
        setSelected(coin);
        setCondition('');
        setUploadedFront(null);
        setUploadedBack(null);
    };

    const handleFrontUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFront(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleBackUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedBack(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <Card className="coin-card mx-auto my-5" style={{ maxWidth: '1000px' }}>
            <Card.Header className="coin-header text-white text-center position-relative overflow-hidden py-3">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <span className="coin-badge"><CoinIcon size={20} /></span>
                    <span className="logo-text h4 mb-0">Coin Identifier</span>
                </div>
                <span className="corner-ribbon" aria-hidden="true" />
            </Card.Header>

            <Card.Body className="p-4 p-md-5">
                <Row>
                    {/* Main content */}
                    <Col md={8}>
                        <Form.Group controlId="coinSelect">
                            <Form.Label className="small-label">Select a Coin</Form.Label>
                            <Form.Select
                                onChange={handleCoinChange}
                                value={selected ? selected.id : ''}
                                className="border-danger form-raise"
                            >
                                <option value="">-- choose a coin --</option>
                                {coinList.map((coin) => (
                                    <option key={coin.id} value={coin.id}>
                                        {coin.name} ({coin.year}{coin.mintMark})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Show a friendly prompt until a coin is selected */}
                        {!selected && (
                            <div className="text-center text-muted mt-4">
                                <ImageIcon size={64} className="text-danger" />
                                <p>Please choose a coin to begin, then upload your images.</p>
                            </div>
                        )}

                        {selected && (
                            <>
                                <div className="divider" />

                                <Row className="g-3">
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label className="small-label">Upload Front</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFrontUpload}
                                                className="border-danger form-raise"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label className="small-label">Upload Back</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBackUpload}
                                                className="border-danger form-raise"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="mt-4"
                                >
                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <img
                                                src={uploadedFront || selected.defaultImages.front}
                                                alt="Front"
                                                className="img-fluid rounded border border-danger hover-lift"
                                            />
                                        </Col>
                                        <Col sm={6}>
                                            <img
                                                src={uploadedBack || selected.defaultImages.back}
                                                alt="Back"
                                                className="img-fluid rounded border border-danger hover-lift"
                                            />
                                        </Col>
                                    </Row>
                                </motion.div>

                                <Form.Group controlId="conditionSelect" className="mt-4">
                                    <Form.Label className="small-label">Select Condition</Form.Label>
                                    <Form.Select
                                        onChange={(e) => setCondition(e.target.value)}
                                        value={condition}
                                        className="border-danger form-raise"
                                    >
                                        <option value="">-- select grade --</option>
                                        {Object.keys(selected.values).map((grade) => (
                                            <option key={grade} value={grade}>{grade}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {condition && (
                                    <div className="mt-4 text-dark">
                                        <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                                            <span className="grade-pill">{condition}</span>
                                            <span className="price-chip">${selected.values[condition].toFixed(2)}</span>
                                        </div>

                                        <h5 className="section-title">Details</h5>
                                        <p className="mb-1"><strong>Name:</strong> {selected.name}</p>
                                        <p className="mb-1"><strong>Year &amp; Mint:</strong> {selected.year}{selected.mintMark}</p>
                                        <p className="fst-italic text-muted">{selected.description}</p>

                                        <ListGroup variant="flush" className="mb-3 fancy-list">
                                            {selected.facts.map((fact, idx) => (
                                                <ListGroup.Item key={idx} className="bg-transparent">
                                                    {fact}
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <Button
                                            className="btn-shine"
                                            variant="danger"
                                            onClick={() => window.open('https://www.pcgs.com/grades', '_blank')}
                                        >
                                            View Grading Guide
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </Col>

                    {/* Sidebar */}
                    <Col md={4} className="ps-md-4 mt-4 mt-md-0">
                        <Card className="terms-card mb-3">
                            <Card.Header className="bg-danger text-white">Mint Mark Key</Card.Header>
                            <Card.Body className="p-2">
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>D</strong> = Denver Mint</ListGroup.Item>
                                    <ListGroup.Item><strong>S</strong> = San Francisco Mint</ListGroup.Item>
                                    <ListGroup.Item><em>(no mark)</em> = Philadelphia Mint</ListGroup.Item>
                                    <ListGroup.Item><strong>O</strong> = New Orleans Mint</ListGroup.Item>
                                    <ListGroup.Item><strong>CC</strong> = Carson City Mint</ListGroup.Item>
                                    <ListGroup.Item><strong>W</strong> = West Point Mint</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        <Card className="terms-card">
                            <Card.Header className="bg-danger text-white">Grading Key</Card.Header>
                            <Card.Body className="p-2">
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>P-1</strong> Poor</ListGroup.Item>
                                    <ListGroup.Item><strong>FR-2</strong> Fair</ListGroup.Item>
                                    <ListGroup.Item><strong>AG-3</strong> About Good</ListGroup.Item>
                                    <ListGroup.Item><strong>G-4</strong> Good</ListGroup.Item>
                                    <ListGroup.Item><strong>VG-8</strong> Very Good</ListGroup.Item>
                                    <ListGroup.Item><strong>F-12</strong> Fine</ListGroup.Item>
                                    <ListGroup.Item><strong>VF-20</strong> Very Fine</ListGroup.Item>
                                    <ListGroup.Item><strong>EF-40</strong> Extremely Fine</ListGroup.Item>
                                    <ListGroup.Item><strong>AU-50</strong> About Uncirculated</ListGroup.Item>
                                    <ListGroup.Item><strong>MS-60+</strong> Mint State</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
