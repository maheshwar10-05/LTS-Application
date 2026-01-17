import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---

const PERSONNEL_LIST = Array.from({ length: 100 }, (_, i) => {
    const roles = i % 3 === 0 ? ['Relationship Manager'] : i % 3 === 1 ? ['Portfolio Manager'] : ['Relationship Manager', 'Portfolio Manager'];
    return {
        id: i + 1,
        name: `Personnel ${i + 1} (${['Smith', 'Doe', 'Johnson', 'Brown', 'Lee'][i % 5]})`,
        email: `personnel${i + 1}@bank.com`,
        jobFunction: roles.join(', '),
        roles: roles
    };
});

const GROUP_DATA = {
    'Canadian Commercial Banking': {
        'Segment Group A': ['Segment A1', 'Segment A2'],
        'Segment Group B': ['Segment B1', 'Segment B2']
    },
    'US Commercial': {
        'Segment Group US1': ['Segment US1-A', 'Segment US1-B'],
        'Segment Group US2': ['Segment US2-A']
    },
    'Business Banking US': {
        'BBUS Group 1': ['BBUS Segment 1', 'BBUS Segment 2']
    }
};

const LTSEntityForm = () => {
    const navigate = useNavigate();

    // --- State ---

    // Core Entity Info
    const [legalOrgType, setLegalOrgType] = useState('');
    const [ownershipClass, setOwnershipClass] = useState('');
    const [entityLegalName, setEntityLegalName] = useState('');
    const [tinSSN, setTinSSN] = useState('');
    const [group, setGroup] = useState('');
    const [segmentGroup, setSegmentGroup] = useState('');
    const [segment, setSegment] = useState('');
    const [isGuarantor, setIsGuarantor] = useState(false);
    const [doingBusinessAs, setDoingBusinessAs] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [entityShortName, setEntityShortName] = useState(''); // Auto-populated
    const [govtIdType, setGovtIdType] = useState('TIN');

    // Addresses
    const [country, setCountry] = useState('');
    const [stateProvince, setStateProvince] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [addressLine, setAddressLine] = useState('');

    // Industry Info
    const [sector, setSector] = useState('');
    const [industrySegment, setIndustrySegment] = useState('');

    // Personnel
    const [personnelSearch, setPersonnelSearch] = useState('');
    const [personnelSuggestions, setPersonnelSuggestions] = useState([]);
    const [addedPersonnel, setAddedPersonnel] = useState([]);

    // Connection
    const [connectionType, setConnectionType] = useState('New Connection');
    const [createNewDeal, setCreateNewDeal] = useState(false);

    // UI State
    const [uenPopup, setUenPopup] = useState({ show: false, uen: '' });

    // --- Effects ---

    // Auto-populate Entity Short Name
    useEffect(() => {
        setEntityShortName(entityLegalName);
    }, [entityLegalName]);

    // Auto-populate Address based on Country/State (Mock)
    useEffect(() => {
        if (country && stateProvince) {
            // Mock auto-fill
            setCity(stateProvince === 'California' ? 'Los Angeles' : stateProvince === 'Ontario' ? 'Toronto' : 'Sample City');
            setPostalCode(country === 'United States' ? '90210' : 'M5V 2T6');
        } else {
            setCity('');
            setPostalCode('');
        }
    }, [country, stateProvince]);

    // --- Handlers ---

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
        setSegmentGroup('');
        setSegment('');
    };

    const handlePersonnelSearch = (e) => {
        const val = e.target.value;
        setPersonnelSearch(val);
        if (val.length > 1) {
            const matches = PERSONNEL_LIST.filter(p => p.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
            setPersonnelSuggestions(matches);
        } else {
            setPersonnelSuggestions([]);
        }
    };

    const addPersonnel = (person) => {
        if (!addedPersonnel.find(p => p.id === person.id)) {
            setAddedPersonnel([...addedPersonnel, person]);
        }
        setPersonnelSearch('');
        setPersonnelSuggestions([]);
    };

    const removePersonnel = (id) => {
        setAddedPersonnel(addedPersonnel.filter(p => p.id !== id));
    };

    const handleCreateUEN = () => {
        // Mock UEN Generation (7 digits)
        const generatedUEN = Math.floor(1000000 + Math.random() * 9000000).toString();
        setUenPopup({ show: true, uen: generatedUEN });
    };

    const handlePopupOk = () => {
        setUenPopup({ show: false, uen: '' });

        // Save to LocalStorage for persistence
        const newBorrower = {
            id: Date.now(),
            rrt: '+', // Keep + for menu
            prospect: 'N',
            name: entityLegalName,
            uen: uenPopup.uen,
            connection: connectionType === 'New Connection' ? 'New' : 'Existing',
            tin: tinSSN,
            address: `${city}, ${stateProvince}, ${country}`,
            arrow: 'v'
        };

        const existingBorrowers = JSON.parse(localStorage.getItem('lts_borrowers') || '[]');
        localStorage.setItem('lts_borrowers', JSON.stringify([...existingBorrowers, newBorrower]));

        // Navigate to Deal Creation and pass state
        navigate('/deal-creation', {
            state: {
                entityName: entityLegalName,
                uen: uenPopup.uen,
                tin: tinSSN,
                personnel: addedPersonnel
            }
        });
    };

    const segmentGroupOptions = group ? Object.keys(GROUP_DATA[group] || {}) : [];
    const segmentOptions = (group && segmentGroup) ? (GROUP_DATA[group][segmentGroup] || []) : [];

    // --- UI Components ---

    const MandatoryLabel = ({ label }) => (
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>
            {label} <span style={{ color: 'red' }}>*</span>
        </label>
    );

    const OptionalLabel = ({ label }) => (
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>
            {label}
        </label>
    );

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '10px', fontFamily: 'Arial, sans-serif' }}>

            {/* UEN Popup */}
            {uenPopup.show && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '300px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <span style={{ fontWeight: 'bold' }}>UEN Generated</span>
                            <span onClick={() => setUenPopup({ show: false, uen: '' })} style={{ cursor: 'pointer' }}>&#10005;</span>
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px', color: 'var(--lts-blue)' }}>
                            {uenPopup.uen} &#10003;
                        </div>
                        <button onClick={handlePopupOk} style={{ width: '100%', padding: '8px', backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={{ backgroundColor: '#005eb8', color: 'white', padding: '8px 15px', fontWeight: 'bold', fontSize: '14px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                New Entity
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', fontSize: '12px' }}>

                {/* --- Row 1 --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Legal Org Type" />
                            <select value={legalOrgType} onChange={e => setLegalOrgType(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                <option>Corp S</option>
                                <option>Corporate (Private)</option>
                                <option>Corporate (Public)</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <input type="checkbox" checked={isGuarantor} onChange={e => setIsGuarantor(e.target.checked)} style={{ marginRight: '5px' }} />
                            <span>Guarantor Only</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Ownership Type" />
                            <select disabled style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#eee' }}>
                                <option>Not Applicable</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Ownership Class" />
                            <select value={ownershipClass} onChange={e => setOwnershipClass(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                <option>Private</option>
                                <option>Public</option>
                                <option>Individual</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Entity Type" />
                            <select style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option>Non-Bank</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="Doing Business As" />
                            <input type="text" value={doingBusinessAs} onChange={e => setDoingBusinessAs(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                    </div>
                </div>

                <div style={{ fontWeight: 'bold', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Customer Information:</div>

                {/* --- Row 2 (Names) --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="First Name" />
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="Middle Name" />
                            <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Entity Legal Name" />
                            <input type="text" value={entityLegalName} onChange={e => setEntityLegalName(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="Last Name" />
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px', opacity: 0 }}>
                            <OptionalLabel label="Spacer" />
                            <input type="text" disabled style={{ width: '100%' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Entity Short Name" />
                            <input type="text" value={entityShortName} readOnly style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>
                </div>

                {/* --- Row 3 (IDs & Groups) --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Entity Classification" />
                            <select style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}><option></option></select>
                        </div>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <MandatoryLabel label="TIN # / SSN #" />
                                <input type="text" maxLength="9" value={tinSSN} onChange={e => setTinSSN(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <span style={{ marginLeft: '10px', fontSize: '10px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Override</span>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Governmental ID Type" />
                            <select value={govtIdType} onChange={e => setGovtIdType(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option>TIN</option>
                                <option>SSN</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="TIN/SSN Verified On" />
                            <input type="text" disabled style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#eee' }} />
                        </div>
                    </div>
                </div>

                {/* --- Row 4 (Groups & Centers) --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        {/* Static Placeholders for Cost Centres */}
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="BMO (US) Cost Centre" />
                            <div style={{ display: 'flex' }}>
                                <select style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}><option></option></select>
                                <span style={{ marginLeft: '5px' }}>&#128269;</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="BMO (US) RESP Centre" />
                            <input type="text" disabled style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#eee' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="BMO (CAD) RESP Centre" />
                            <div style={{ display: 'flex' }}>
                                <select style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}><option></option></select>
                                <span style={{ marginLeft: '5px' }}>&#128269;</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Group" />
                            <select value={group} onChange={handleGroupChange} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                <option>Canadian Commercial Banking</option>
                                <option>US Commercial</option>
                                <option>Business Banking US</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Segment Group" />
                            <select value={segmentGroup} onChange={e => { setSegmentGroup(e.target.value); setSegment(''); }} disabled={!group} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                {segmentGroupOptions.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Segment" />
                            <select value={segment} onChange={e => setSegment(e.target.value)} disabled={!segmentGroup} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                {segmentOptions.map(o => <option key={o}>{o}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Principal Place of Business Address:</div>

                {/* --- Address --- */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Street" />
                            <input type="text" value={addressLine} onChange={e => setAddressLine(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="State/Province" />
                            <select value={stateProvince} onChange={e => setStateProvince(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                <option>California</option>
                                <option>New York</option>
                                <option>Ontario</option>
                                <option>Quebec</option>
                            </select>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Country" />
                            <select value={country} onChange={e => setCountry(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option value="">Select</option>
                                <option>United States</option>
                                <option>Canada</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="Address Verified On" />
                            <input type="text" disabled style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#eee' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="City" />
                            <input type="text" value={city} readOnly style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }} />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <OptionalLabel label="ZIP Code / Postal Code" />
                            <input type="text" value={postalCode} readOnly style={{ width: '100%', padding: '4px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>
                </div>

                <div style={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Industry Info:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '15px' }}>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Sector" />
                            <select value={sector} onChange={e => setSector(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option>Services</option>
                                <option>Manufacturing</option>
                                <option>Technology</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '10px' }}>
                            <MandatoryLabel label="Industry Segment" />
                            <select value={industrySegment} onChange={e => setIndustrySegment(e.target.value)} style={{ width: '100%', padding: '4px', border: '1px solid #ccc' }}>
                                <option>Software</option>
                                <option>Education</option>
                                <option>Finance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '20px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Personnel:</div>
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Select Personnel"
                            value={personnelSearch}
                            onChange={handlePersonnelSearch}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                        />
                        {personnelSuggestions.length > 0 && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', border: '1px solid #ccc', zIndex: 10 }}>
                                {personnelSuggestions.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => addPersonnel(p)}
                                        style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                                        onMouseEnter={e => e.target.style.backgroundColor = '#f5f5f5'}
                                        onMouseLeave={e => e.target.style.backgroundColor = 'white'}
                                    >
                                        {p.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Added Personnel Table */}
                <div style={{ backgroundColor: 'var(--lts-blue)', color: 'white', padding: '5px 10px', fontWeight: 'bold', fontSize: '11px' }}>
                    Added Personnel
                </div>
                <div style={{ border: '1px solid #ccc', marginBottom: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 50px', backgroundColor: '#e6e6e6', fontWeight: 'bold', fontSize: '11px' }}>
                        <div style={{ padding: '5px', borderRight: '1px solid #ccc' }}>User Name</div>
                        <div style={{ padding: '5px', borderRight: '1px solid #ccc' }}>Email</div>
                        <div style={{ padding: '5px', borderRight: '1px solid #ccc' }}>Job Function</div>
                        <div style={{ padding: '5px', borderRight: '1px solid #ccc' }}>Primary</div>
                        <div style={{ padding: '5px', textAlign: 'center' }}>Action</div>
                    </div>
                    {addedPersonnel.map(p => (
                        <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 50px', borderBottom: '1px solid #eee' }}>
                            <div style={{ padding: '5px', borderRight: '1px solid #eee' }}>{p.name}</div>
                            <div style={{ padding: '5px', borderRight: '1px solid #eee' }}>{p.email}</div>
                            <div style={{ padding: '5px', borderRight: '1px solid #eee' }}>{p.jobFunction}</div>
                            <div style={{ padding: '5px', borderRight: '1px solid #eee', textAlign: 'center' }}><input type="radio" name="primary" /></div>
                            <div style={{ padding: '5px', textAlign: 'center' }}>
                                <button onClick={() => removePersonnel(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}>&#10005;</button>
                            </div>
                        </div>
                    ))}
                    {addedPersonnel.length === 0 && <div style={{ padding: '10px', textAlign: 'center', color: '#999' }}>No personnel added</div>}
                </div>

                <div style={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '20px' }}>Credit Connection:</div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <input type="radio" name="connection" checked={connectionType === 'New Connection'} onChange={() => setConnectionType('New Connection')} style={{ marginRight: '5px' }} />
                        New Connection
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="radio" name="connection" checked={connectionType === 'Existing Connection'} onChange={() => setConnectionType('Existing Connection')} style={{ marginRight: '5px' }} />
                        Existing Connection
                    </label>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="checkbox" checked={createNewDeal} onChange={e => setCreateNewDeal(e.target.checked)} style={{ marginRight: '5px' }} />
                        Create a New Deal
                    </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button onClick={handleCreateUEN} style={{ padding: '8px 20px', backgroundColor: 'var(--lts-blue)', color: 'white', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Create UEN
                    </button>
                    <button onClick={() => navigate('/')} style={{ padding: '8px 20px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '15px', cursor: 'pointer' }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LTSEntityForm;
